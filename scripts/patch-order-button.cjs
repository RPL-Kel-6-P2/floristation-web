const fs = require('fs');
const path = require('path');
const { products } = require('../src/data/products.js');
const dir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(dir).filter((f) => f.startsWith('ProductDetail') && f.endsWith('.jsx'));
let changed = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('navigate("/order")')) continue;
  const key = file
    .replace('ProductDetail', '')
    .replace('.jsx', '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-+/, '')
    .replace(/-+/g, '-');
  const product = products.find((p) => p.detailPath === `/detail-${key}`);
  if (!product) {
    console.error('No product match for', file);
    continue;
  }
  const produkObj = {
    name: product.name,
    price: product.price,
    image: product.image,
  };
  const produkJs = JSON.stringify(produkObj, null, 2).replace(/"([^\"]+)":/g, '$1:');
  if (content.includes('const produk =')) continue;
  content = content.replace(/const navigate = useNavigate\(\);/, `const navigate = useNavigate();\n  const produk = ${produkJs};`);
  content = content.replace(/navigate\("\/order"\)/g, 'navigate("/order", { state: produk })');
  fs.writeFileSync(filePath, content);
  changed++;
}
console.log('patched', changed, 'files');
