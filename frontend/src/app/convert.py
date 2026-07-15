import os
import re
import sys

def convert_tsx_to_modules(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the css import and change to module
    # e.g. import "./dashboard.css"; -> import styles from "./dashboard.module.css";
    content = re.sub(r'import\s+["\']\.\/(.*)\.css["\']\s*;', r'import styles from "./\1.module.css";', content)

    # Convert className="something" to className={styles['something']}
    def replacer(match):
        classes = match.group(1).strip().split()
        if not classes:
            return 'className=""'
        if len(classes) == 1:
            return f"className={{styles['{classes[0]}']}}"
        else:
            style_vars = [f"styles['{c}']" for c in classes]
            return f"className={{`${{{'} ${'.join(style_vars)}}}`}}"
            
    # Watch out for existing className={...} we only want className="..."
    content = re.sub(r'className="([^"]+)"', replacer, content)

    with open(file_path, 'w') as f:
        f.write(content)

def rename_css_to_module(dir_path):
    for f in os.listdir(dir_path):
        if f.endswith('.css') and not f.endswith('.module.css'):
            old_path = os.path.join(dir_path, f)
            new_path = os.path.join(dir_path, f.replace('.css', '.module.css'))
            
            # Read CSS to fix :root, body, and *
            with open(old_path, 'r') as file:
                css_content = file.read()
            
            # Replace generic tags that shouldn't be scoped if we want them to just apply to the container
            # Actually with CSS modules, `body` and `:root` are hashed. We should use :global(body) or just 
            # change them to a class. Let's just change `:root` to `.theme-root`, `body` to `.theme-body`, `*` to `.theme-body *`
            css_content = css_content.replace(':root', '.theme-root')
            css_content = re.sub(r'^body\s*\{', '.theme-body {', css_content, flags=re.MULTILINE)
            # Replace * { with *, *::before, *::after { (standard reset, maybe better to just let global handle it)
            # Actually, Next.js globals.css handles *. Let's just leave * alone, but CSS modules will hash it?
            # Wait, CSS modules don't hash `*`, they hash classes. Tags like `h1` will apply globally! 
            # Ah! CSS modules don't automatically scope tags like `h1` or `div`. They only scope `.classNames`.
            
            with open(new_path, 'w') as file:
                file.write(css_content)
            
            os.remove(old_path)
            print(f"Renamed {old_path} to {new_path}")

if __name__ == "__main__":
    target_dir = sys.argv[1]
    rename_css_to_module(target_dir)
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.tsx'):
                convert_tsx_to_modules(os.path.join(root, file))
                print(f"Converted TSX: {os.path.join(root, file)}")
