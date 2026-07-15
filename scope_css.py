import os

def scope_css(src, dest, scope_class):
    with open(src, 'r') as f:
        content = f.read()
    
    # Wrap in scope
    scoped_content = f".{scope_class} {{\n{content}\n}}"
    
    with open(dest, 'w') as f:
        f.write(scoped_content)
    print(f"Scoped {dest} with {scope_class}")

scope_css('/Users/arkachakraborty/Documents/Projects/vyaparSetu_UI/supplier-dashboard.css', 
          '/Users/arkachakraborty/Documents/Projects/vyaaparSetu/frontend/src/app/supplier/dashboard/dashboard.scss', 
          'scope-supplier-dashboard')

scope_css('/Users/arkachakraborty/Documents/Projects/vyaparSetu_UI/vyaparsetu-ai-broker.css', 
          '/Users/arkachakraborty/Documents/Projects/vyaaparSetu/frontend/src/app/ai-broker/broker.scss', 
          'scope-ai-broker')
