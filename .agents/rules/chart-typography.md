# Chart Typography Guideline

## Primary Font for All Charts
All data visualizations, charts, diagrams, and graphs in this project MUST use **Google Sans Flex** as their primary typography.

### Font Import
Ensure the font is imported in every chart document / iframe:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### CSS Usage
```css
font-family: 'Google Sans Flex', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Chart Libraries (Plotly, D3, etc.)
- For Plotly layouts:
  ```javascript
  layout: {
    font: { family: "'Google Sans Flex', sans-serif" }
  }
  ```
- All titles, subtitles, axis labels, tick labels, legends, hover labels, and data row callouts must use **Google Sans Flex**.
