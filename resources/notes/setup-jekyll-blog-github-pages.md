---
title: Hướng dẫn setup Jekyll blog trên GitHub Pages
layout: default
date: 2026-05-04
---

# Hướng dẫn setup Jekyll blog trên GitHub Pages

Blog này chạy trên **Jekyll** + **GitHub Pages** — hoàn toàn miễn phí, không cần server, tự động deploy khi push code. Bài này ghi lại cách mình setup từ đầu.

---

## Stack

| Thành phần | Vai trò |
|-----------|---------|
| Jekyll | Static site generator, biến Markdown thành HTML |
| GitHub Pages | Hosting miễn phí |
| GitHub Actions | CI/CD tự động build và deploy |
| Minima | Theme mặc định của Jekyll |

---

## Cấu trúc thư mục

```
.
├── _config.yml          # Cấu hình Jekyll
├── _data/
│   └── navigation.yml   # Dữ liệu navigation sidebar
├── _layouts/
│   └── default.html     # Layout HTML chính
├── _posts/              # Bài viết (YYYY-MM-DD-slug.md)
├── _sass/
│   └── main.scss        # CSS source
├── assets/
│   └── css/
│       └── style.scss   # Entry point SCSS (Jekyll compile ra style.css)
├── index.md             # Trang chủ
└── Gemfile              # Ruby dependencies
```

---

## Bước 1: Tạo repository trên GitHub

Tạo repo tên `<username>.github.io` (ví dụ: `nolandpham.github.io`). Đây là convention để GitHub Pages tự nhận diện và serve tại `https://<username>.github.io`.

---

## Bước 2: Cấu hình Jekyll

**`_config.yml`** — file quan trọng nhất:

```yaml
title: AnPham Blog
description: Personal blog
url: "https://nolandpham.github.io"
baseurl: ""
theme: minima

markdown: kramdown
permalink: /blog/:year/:month/:day/:title/

exclude:
  - Gemfile
  - Gemfile.lock
```

Lưu ý:

**Phương án 1 — Clean minimal:**

- `url` — domain thật của site, dùng cho SEO và RSS feed
- `baseurl: ""` — để trống nếu site ở root domain (không phải `/blog` subdirectory)
- `permalink` — format URL cho blog posts
- `exclude` — các file không đưa vào build output
{:.list-style-1}

**Phương án 2 — Card style:**

- `url` — domain thật của site, dùng cho SEO và RSS feed
- `baseurl: ""` — để trống nếu site ở root domain (không phải `/blog` subdirectory)
- `permalink` — format URL cho blog posts
- `exclude` — các file không đưa vào build output
{:.list-style-2}

**Phương án 3 — Icon dot:**

- `url` — domain thật của site, dùng cho SEO và RSS feed
- `baseurl: ""` — để trống nếu site ở root domain (không phải `/blog` subdirectory)
- `permalink` — format URL cho blog posts
- `exclude` — các file không đưa vào build output
{:.list-style-3}

---

## Bước 3: Gemfile

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.8"
```

`github-pages` gem đảm bảo local build dùng đúng version Jekyll như GitHub Pages. `webrick` cần cho Ruby 3.x.

---

## Bước 4: Layout HTML

**`_layouts/default.html`** dùng Liquid template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{% raw %}{{ page.title }}{% endraw %}</title>
  <link rel="stylesheet" href="{% raw %}{{ '/assets/css/style.css' | relative_url }}{% endraw %}">
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <nav class="para-nav">
        {% raw %}{% for section in site.data.navigation %}{% endraw %}
        <div class="para-section">
          <h3>{% raw %}{{ section.title }}{% endraw %}</h3>
          <ul>
            {% raw %}{% for link in section.links %}{% endraw %}
            <li><a href="{% raw %}{{ link.url | relative_url }}{% endraw %}">{% raw %}{{ link.label }}{% endraw %}</a></li>
            {% raw %}{% endfor %}{% endraw %}
          </ul>
        </div>
        {% raw %}{% endfor %}{% endraw %}
      </nav>
    </aside>
    <main class="content">
      {% raw %}{{ content }}{% endraw %}
    </main>
  </div>
</body>
</html>
```

Navigation được đọc từ `_data/navigation.yml` thay vì hardcode — dễ thêm/sửa mà không cần đụng vào layout.

---

## Bước 5: SCSS pipeline

Jekyll compile SCSS tự động. Cấu trúc:

**`_sass/main.scss`** — viết CSS ở đây:
```scss
body {
  font-family: -apple-system, sans-serif;
  // ...
}
```

**`assets/css/style.scss`** — entry point, phải có frontmatter `---`:
```scss
---
---

@import "main";
```

Jekyll sẽ compile file này thành `assets/css/style.css` trong output.

---

## Bước 6: Viết bài

Tất cả bài viết để trong `_posts/`, tên file theo format:

```
_posts/YYYY-MM-DD-ten-bai.md
```

Mỗi file cần frontmatter:

```yaml
---
title: Tiêu đề bài viết
layout: default
date: 2026-05-04
---

Nội dung bài viết ở đây...
```

---

## Bước 7: CI/CD với GitHub Actions

**`.github/workflows/publish.yml`**:

```yaml
name: Deploy Jekyll to GitHub Pages

on:
  push:
    branches: [release]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site
      - uses: actions/upload-pages-artifact@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Workflow chỉ trigger khi push vào branch `release` — đây là branch production.

---

## Branch workflow

```
draft   ← viết bài mới (chưa public)
  ↓ merge PR
master  ← review và chỉnh sửa
  ↓ merge PR
release ← trigger CI/CD → deploy lên internet
```

Ưu điểm: tách bạch rõ giữa bài đang viết, bài đang review, và bài đã public.

---

## Chạy local

```bash
bundle install
bundle exec jekyll serve
```

Site chạy tại `http://localhost:4000`. Jekyll tự reload khi có thay đổi file.

---

## Kết

Toàn bộ setup này miễn phí và không cần quản lý server. Mỗi khi muốn đăng bài, chỉ cần viết Markdown rồi merge vào `release` — GitHub lo phần còn lại.
