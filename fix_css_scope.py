import os
import re

files_to_fix = [
    '/Users/arkachakraborty/Documents/Projects/vyaaparSetu/frontend/src/app/supplier/dashboard/dashboard.scss',
    '/Users/arkachakraborty/Documents/Projects/vyaaparSetu/frontend/src/app/ai-broker/broker.scss'
]

for filepath in files_to_fix:
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace 'body {' with '& {'
    content = re.sub(r'\bbody\s*\{', '& {', content)
    # Replace 'html {' with '& {'
    content = re.sub(r'\bhtml\s*\{', '& {', content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Fixed {filepath}")
