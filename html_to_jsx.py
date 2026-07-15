import re
import os

def css_to_dict_string(css_str):
    if not css_str.strip():
        return "{{}}"
    rules = css_str.split(';')
    styles = []
    for rule in rules:
        if ':' not in rule: continue
        key, val = rule.split(':', 1)
        key = key.strip()
        val = val.strip().replace("'", "\\'")
        # kebab to camel
        parts = key.split('-')
        key_camel = parts[0] + ''.join(x.title() for x in parts[1:])
        styles.append(f"'{key_camel}': '{val}'")
    return "{{" + ", ".join(styles) + "}}"

def convert_html_to_jsx(filepath, output_path, component_name, scope_class):
    with open(filepath, 'r') as f:
        html = f.read()

    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
    if not body_match:
        print(f"No body found in {filepath}")
        return
    
    body = body_match.group(1)
    
    # Remove script tags
    body = re.sub(r'<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>', '', body, flags=re.IGNORECASE)
    
    # Replace class with className
    body = body.replace('class="', 'className="')
    
    # Replace for with htmlFor
    body = body.replace('for="', 'htmlFor="')
    
    # Replace onclick with onClick
    # e.g. onclick="alert('...')" -> onClick={() => alert('...')}
    def replace_onclick(match):
        content = match.group(1).replace('"', '&quot;')
        return f"onClick={{() => {{ {content} }}}}"
    body = re.sub(r'onclick="([^"]*)"', replace_onclick, body, flags=re.IGNORECASE)
    
    # Convert style attributes
    def replace_style(match):
        css_str = match.group(1)
        return f"style={css_to_dict_string(css_str)}"
    body = re.sub(r'style="([^"]*)"', replace_style, body, flags=re.IGNORECASE)
    
    # Fix void elements (input, img, br, hr)
    body = re.sub(r'<input([^>]*[^/])>', r'<input\1 />', body, flags=re.IGNORECASE)
    body = re.sub(r'<img([^>]*[^/])>', r'<img\1 />', body, flags=re.IGNORECASE)
    body = re.sub(r'<br\s*>', r'<br />', body, flags=re.IGNORECASE)
    body = re.sub(r'<hr\s*>', r'<hr />', body, flags=re.IGNORECASE)
    
    # Quick fix for specific unclosed or weird tags in raw HTML
    body = body.replace('colspan=', 'colSpan=')
    body = body.replace('readonly', 'readOnly')
    body = body.replace('<!--', '{/*')
    body = body.replace('-->', '*/}')
    
    # Generate TSX
    tsx_content = f"""\"use client\";

import React, {{ useEffect, useState }} from \"react\";
import Link from \"next/link\";
import { '\"./dashboard.scss\"' if 'dashboard' in component_name.lower() else '\"./broker.scss\"' };

export default function {component_name}() {{
  useEffect(() => {{
    // Interactive scripts can be wired here later
  }}, []);

  return (
    <div className=\"{scope_class}\">
{body}
    </div>
  );
}}
"""
    with open(output_path, 'w') as f:
        f.write(tsx_content)
    print(f"Generated {output_path}")

convert_html_to_jsx(
    '/Users/arkachakraborty/Documents/Projects/vyaparSetu_UI/supplier-dashboard.html',
    '/Users/arkachakraborty/Documents/Projects/vyaaparSetu/frontend/src/app/supplier/dashboard/page.tsx',
    'SupplierDashboard',
    'scope-supplier-dashboard'
)

convert_html_to_jsx(
    '/Users/arkachakraborty/Documents/Projects/vyaparSetu_UI/vyaparsetu-ai-broker.html',
    '/Users/arkachakraborty/Documents/Projects/vyaaparSetu/frontend/src/app/ai-broker/page.tsx',
    'AIBroker',
    'scope-ai-broker'
)
