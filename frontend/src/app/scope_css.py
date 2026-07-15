import os
import re
import sys

def scope_route(dir_path, scope_class):
    css_files = [f for f in os.listdir(dir_path) if f.endswith('.css') or f.endswith('.scss')]
    if not css_files:
        return
        
    css_file = css_files[0]
    old_css_path = os.path.join(dir_path, css_file)
    new_scss_path = os.path.join(dir_path, css_file.replace('.css', '.scss'))
    
    # 1. Read CSS, replace :root, and wrap in scope
    with open(old_css_path, 'r') as f:
        css = f.read()
        
    # extract @import statements to put them at the top outside the scope
    imports = []
    lines = css.split('\n')
    rest = []
    for line in lines:
        if line.strip().startswith('@import'):
            imports.append(line)
        else:
            rest.append(line)
            
    css = '\n'.join(rest)
    
    # Replace :root with the scope class
    css = css.replace(':root', f'.{scope_class}')
    
    # Wrap in scope class
    scss_content = '\n'.join(imports) + f"\n\n.{scope_class} {{\n" + css + "\n}\n"
    
    with open(new_scss_path, 'w') as f:
        f.write(scss_content)
        
    if old_css_path != new_scss_path:
        os.remove(old_css_path)
        
    # 2. Update page.tsx
    tsx_path = os.path.join(dir_path, 'page.tsx')
    if not os.path.exists(tsx_path):
        return
        
    with open(tsx_path, 'r') as f:
        tsx = f.read()
        
    # Update import
    tsx = re.sub(r'import\s+["\']\.\/(.*)\.css["\']\s*;', r'import "./\1.scss";', tsx)
    
    # We also need to add the scope class to the outermost div of the return statement
    # A simple regex won't perfectly parse JSX, but we can do a hack:
    # Find the first `<div` after `return (` and inject the class.
    # Actually, we can just replace the outermost div if we know it.
    # Let's just find `return (` and inject a wrapper div.
    def inject_wrapper(match):
        return f'return (\n    <div className="{scope_class}">'
    
    if scope_class not in tsx: # Prevent double wrapping
        tsx = re.sub(r'return\s*\(\s*', inject_wrapper, tsx, count=1)
        # We need to close this div. The easiest way is to append </div> right before the last );
        
        # Find the last );
        last_paren_idx = tsx.rfind(');')
        if last_paren_idx != -1:
            tsx = tsx[:last_paren_idx] + '    </div>\n  ' + tsx[last_paren_idx:]
            
    with open(tsx_path, 'w') as f:
        f.write(tsx)

    print(f"Scoped {dir_path} with {scope_class}")

if __name__ == "__main__":
    routes = {
        "ai-broker": "scope-ai-broker",
        "supplier/dashboard": "scope-supplier-dashboard",
        "supplier/catalog-upload": "scope-supplier-catalog-upload",
        "supplier/influencer": "scope-supplier-influencer",
        "supplier/marketing": "scope-supplier-marketing",
        "supplier/auth": "scope-supplier-auth",
        "supplier": "scope-supplier-main" # The landing page
    }
    
    base_dir = "/Users/arkachakraborty/Documents/Projects/vyaaparSetu/frontend/src/app"
    
    for route, scope in routes.items():
        full_path = os.path.join(base_dir, route)
        if os.path.exists(full_path):
            scope_route(full_path, scope)
