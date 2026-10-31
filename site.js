(function () {
  'use strict';

  const data = window.SUMBERMAS_CONTENT;
  if (!data || !data.site || !Array.isArray(data.products) || !Array.isArray(data.branches)) {
    console.error('SumberMas: content.js belum terbaca atau format datanya tidak sesuai.');
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const clean = value => String(value ?? '').trim();
  const formatRupiah = value => new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0
  }).format(Number(value));
  const branchById = id => data.branches.find(branch => branch.id === id) || data.branches[0];
  const defaultBranch = branchById(data.site.defaultBranchId);
  const waUrl = (phone, message = '') => `https://wa.me/${encodeURIComponent(phone)}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined && value !== null) element.textContent = value;
  }

  function setLink(id, url, hideWhenEmpty = false) {
    const element = document.getElementById(id);
    if (!element) return;
    if (clean(url)) {
      element.href = url;
      element.hidden = false;
    } else if (hideWhenEmpty) {
      element.hidden = true;
    }
  }

  function renderSiteInfo() {
    const site = data.site;
    document.title = `${site.name} | Cetak Ide Jadi Nyata`;
    const description = $('meta[name="description"]');
    const ogDescription = $('meta[property="og:description"]');
    if (description) description.content = site.description || '';
    if (ogDescription) ogDescription.content = site.ogDescription || site.description || '';

    setText('toplineText', site.topLine);
    setText('brandName', site.brandName);
    setText('brandTagline', site.tagline);
    setText('footerBrandName', site.brandName);
    setText('footerBrandTagline', site.tagline);

    // Logo dapat diubah melalui site.logo di content.js.
    const logoConfig = site.logo || {};
    const logoPath = clean(logoConfig.image);
    const logoMode = logoConfig.mode === 'symbol' ? 'symbol' : 'full';
    [
      { brand: 'headerBrand', image: 'headerBrandLogo' },
      { brand: 'footerBrand', image: 'footerBrandLogo' }
    ].forEach(({ brand, image }) => {
      const brandEl = document.getElementById(brand);
      const imageEl = document.getElementById(image);
      if (!brandEl || !imageEl) return;
      if (logoPath) {
        imageEl.src = logoPath;
        imageEl.alt = logoConfig.alt || `Logo ${site.name}`;
        imageEl.className = `brand-logo mode-${logoMode}`;
        imageEl.hidden = false;
        brandEl.classList.toggle('logo-full', logoMode === 'full');
        brandEl.classList.toggle('logo-symbol', logoMode === 'symbol');
        imageEl.addEventListener('error', () => {
          imageEl.hidden = true;
          brandEl.classList.remove('logo-full', 'logo-symbol');
          console.warn(`SumberMas: file logo tidak ditemukan: ${logoPath}`);
        }, { once: true });
      }
    });

    setText('copyrightBrand', site.name);
    setText('copyrightLine', site.copyrightLine || '');

    if (site.instagram) {
      setLink('toplineInstagram', site.instagram);
      setLink('footerInstagram', site.instagram);
    } else {
      const topInstagram = $('#toplineInstagram');
      const footerInstagram = $('#footerInstagram');
      if (topInstagram) topInstagram.hidden = true;
      if (footerInstagram) footerInstagram.hidden = true;
    }

    setText('heroEyebrow', site.hero?.eyebrow || 'Solusi cetak untuk setiap kebutuhan');
    setText('heroTitlePrefix', site.hero?.titlePrefix || 'Cetak ide jadi');
    setText('heroTitleAccent', site.hero?.titleAccent || 'nyata.');
    setText('heroDescription', site.hero?.description || site.description);
    setText('heroProof', site.hero?.proof || 'Melayani kebutuhan cetak Anda.');
    setText('catalogDescription', site.catalogDescription || 'Pilih produk yang Anda butuhkan.');
    setText('serviceDescription', site.serviceDescription || 'Kami melayani beragam kebutuhan cetak.');
    setText('closingTitle', site.closingTitle || 'Hubungi kami untuk kebutuhan cetak Anda.');
    setText('footerDescription', site.description || '');

    const heroImageFrame = $('#heroImageFrame');
    const heroImage = $('#heroImage');
    if (heroImageFrame && heroImage) {
      heroImage.alt = site.hero?.imageAlt || 'Contoh produk cetak SumberMas';
      if (site.hero?.image) {
        heroImage.addEventListener('load', () => heroImageFrame.classList.add('img-loaded'), { once: true });
        heroImage.src = site.hero.image;
        heroImage.addEventListener('error', () => {
          heroImage.remove();
          heroImageFrame.classList.add('img-fallback');
        }, { once: true });
      } else {
        heroImage.remove();
        heroImageFrame.classList.add('img-fallback');
      }
    }

    const poster = site.servicePoster || {};
    const posterTitle = $('#servicePosterTitle');
    if (posterTitle) {
      posterTitle.replaceChildren();
      (poster.titleLines || ['MAKE IT', 'PRINT.', 'MATTER.']).forEach((line, index) => {
        if (index) posterTitle.append(document.createElement('br'));
        posterTitle.append(document.createTextNode(line));
      });
    }
    setText('servicePosterSubtitle', poster.subtitle || 'Print that speaks for your brand');
    setText('servicePosterFooter', poster.footer || site.name);

    const footerEmail = $('#footerEmail');
    if (footerEmail && clean(site.email)) {
      footerEmail.href = `mailto:${site.email}`;
      footerEmail.textContent = site.email;
      footerEmail.hidden = false;
    }

    const closingCta = $('#closingCta');
    if (closingCta && defaultBranch?.whatsapp) {
      closingCta.href = waUrl(defaultBranch.whatsapp, `Halo ${site.name}, saya ingin konsultasi kebutuhan cetak.`);
      closingCta.target = '_blank';
      closingCta.rel = 'noopener';
    }

    const floating = $('#floatingWhatsApp');
    if (floating && defaultBranch?.whatsapp) {
      floating.href = waUrl(defaultBranch.whatsapp, `Halo ${site.name}, saya ingin bertanya tentang produk cetak.`);
      floating.target = '_blank';
      floating.rel = 'noopener';
    }

    setText('year', new Date().getFullYear());
  }

  function renderStrip() {
    const host = $('#serviceStrip');
    if (!host) return;
    host.innerHTML = (data.site.stripItems || []).map(item => `
      <div class="strip-item"><span class="strip-icon">${escapeHtml(item.icon || '✳')}</span>${escapeHtml(item.label || '')}</div>
    `).join('');
  }

  function renderFilters() {
    const host = $('#productFilters');
    if (!host) return;
    const categories = data.categories?.length ? data.categories : [{ id: 'all', label: 'Semua produk' }];
    host.innerHTML = categories.map((category, index) => `
      <button class="filter-btn${index === 0 || category.id === 'all' ? ' active' : ''}" type="button" data-filter="${escapeHtml(category.id)}">${escapeHtml(category.label)}</button>
    `).join('');

    host.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        host.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        document.querySelectorAll('.product-card').forEach(card => {
          card.hidden = filter !== 'all' && card.dataset.category !== filter;
        });
      });
    });
  }

  function renderProductPrice(product) {
    const priceFrom = Number.isFinite(Number(product.priceFrom)) && product.priceFrom !== null && product.priceFrom !== ''
      ? Number(product.priceFrom) : null;
    const headline = priceFrom === null ? 'Hubungi kami' : `Mulai ${formatRupiah(priceFrom)}`;
    const unit = priceFrom !== null && product.priceUnit ? `<span class="price-unit">${escapeHtml(product.priceUnit)}</span>` : '';
    const variants = Array.isArray(product.priceVariants) ? product.priceVariants.slice(0, 4) : [];
    const variantMarkup = variants.length ? `
      <div class="price-variants">${variants.map(variant => {
        const value = variant.price === null || variant.price === undefined || variant.price === ''
          ? 'Hubungi kami' : formatRupiah(variant.price);
        return `<div class="price-variant"><span>${escapeHtml(variant.label || variant.specification || 'Pilihan')}</span><strong>${escapeHtml(value)}</strong></div>`;
      }).join('')}</div>` : '';
    return `
      <div class="price-row"><span class="price-label">Harga</span><span class="price-value">${escapeHtml(headline)}</span>${unit}</div>
      ${product.priceNote ? `<p class="price-note">${escapeHtml(product.priceNote)}</p>` : ''}
      ${variantMarkup}
    `;
  }

  function renderProducts() {
    const host = $('#productGrid');
    if (!host) return;
    if (!data.products.length) {
      host.innerHTML = '<div class="empty-state">Katalog produk sedang diperbarui.</div>';
      return;
    }

    host.innerHTML = data.products.map(product => {
      const image = clean(product.image);
      const imageMarkup = image
        ? `<img loading="lazy" src="${escapeHtml(image)}" alt="${escapeHtml(product.imageAlt || product.name)}">`
        : '';
      return `
        <article class="product-card" data-category="${escapeHtml(product.category || 'lainnya')}">
          <div class="product-image${image ? '' : ' img-fallback'}" data-fallback="${escapeHtml(product.name)}">${imageMarkup}<span class="product-type">${escapeHtml(product.categoryLabel || product.category || 'Produk')}</span></div>
          <div class="product-content">
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.description || '')}</p>
            ${renderProductPrice(product)}
            <a class="text-link product-order" data-product="${escapeHtml(product.id)}" href="#kontak">Tanya produk ↗</a>
          </div>
        </article>`;
    }).join('');

    host.querySelectorAll('.product-image img').forEach(image => {
      image.addEventListener('load', () => image.parentElement.classList.add('img-loaded'), { once: true });
      image.addEventListener('error', () => {
        image.remove();
        image.parentElement.classList.add('img-fallback');
      }, { once: true });
    });

    host.querySelectorAll('.product-order').forEach(link => {
      link.addEventListener('click', () => {
        const select = $('#productSelect');
        if (select) select.value = link.dataset.product;
      });
    });
  }

  function renderServices() {
    const host = $('#serviceList');
    if (!host) return;
    host.innerHTML = (data.services || []).map(service => `
      <div class="service-item"><span class="service-check">✓</span><div><strong>${escapeHtml(service.title)}</strong><small>${escapeHtml(service.description || '')}</small></div></div>
    `).join('');
  }

  function renderFormOptions() {
    const productSelect = $('#productSelect');
    const branchSelect = $('#branchSelect');
    if (productSelect) {
      productSelect.innerHTML = '<option value="">Pilih produk</option>' + data.products.map(product =>
        `<option value="${escapeHtml(product.id)}">${escapeHtml(product.name)}</option>`
      ).join('') + '<option value="lainnya">Produk lainnya</option>';
    }
    if (branchSelect) {
      branchSelect.innerHTML = '<option value="">Pilih cabang</option>' + data.branches.map(branch =>
        `<option value="${escapeHtml(branch.id)}">${escapeHtml(branch.name)}</option>`
      ).join('');
      if (defaultBranch) branchSelect.value = defaultBranch.id;
    }
  }

  function renderLocations() {
    const host = $('#locationGrid');
    if (!host) return;
    host.innerHTML = data.branches.map(branch => {
      const query = branch.mapQuery || branch.address || branch.name;
      const embedUrl = branch.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
      const mapUrl = branch.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      const emailMarkup = branch.email ? `<a class="branch-email" href="mailto:${escapeHtml(branch.email)}">${escapeHtml(branch.email)}</a>` : '';
      return `
        <article class="location-card">
          <div class="map-frame"><iframe loading="lazy" title="Peta lokasi SumberMas ${escapeHtml(branch.name)}" src="${escapeHtml(embedUrl)}" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
          <div class="loc-content">
            <span class="loc-tag">${escapeHtml(branch.label || 'Cabang SumberMas')}</span>
            <h3>${escapeHtml(branch.name)}</h3>
            <p>${escapeHtml(branch.address || 'Alamat cabang dapat ditanyakan melalui WhatsApp.')}</p>
            <div class="loc-contact"><span class="phone">${escapeHtml(branch.phoneDisplay || branch.whatsapp || '')}</span>${branch.whatsapp ? `<a class="wa-small" href="${waUrl(branch.whatsapp, `Halo ${data.site.name}, saya ingin menghubungi cabang ${branch.name}.`)}" target="_blank" rel="noopener">WhatsApp ↗</a>` : ''}</div>
            ${emailMarkup}
            <div class="loc-actions"><a href="${escapeHtml(mapUrl)}" target="_blank" rel="noopener">Buka Google Maps ↗</a>${branch.whatsapp ? `<a href="${waUrl(branch.whatsapp)}" target="_blank" rel="noopener">Hubungi cabang</a>` : ''}</div>
          </div>
        </article>`;
    }).join('');
  }

  function renderFooterContacts() {
    const host = $('#footerContacts');
    if (!host) return;
    host.innerHTML = data.branches.map(branch => `
      <a href="${waUrl(branch.whatsapp)}" target="_blank" rel="noopener">${escapeHtml(branch.name)} · ${escapeHtml(branch.phoneDisplay || '')}</a>
    `).join('');
  }

  function bindMenu() {
    const menuToggle = $('#menuToggle');
    const navLinks = $('#navLinks');
    if (!menuToggle || !navLinks) return;
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }));
  }

  function bindOrderForm() {
    const form = $('#orderForm');
    if (!form) return;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = clean($('#customerName')?.value);
      const productId = $('#productSelect')?.value;
      const branchId = $('#branchSelect')?.value;
      const details = clean($('#orderDetails')?.value);
      const product = data.products.find(item => item.id === productId);
      const branch = branchById(branchId);

      if (!name || !productId || !branchId || !branch?.whatsapp) {
        alert('Mohon lengkapi nama, produk, dan cabang yang ingin dihubungi.');
        return;
      }

      const productName = product?.name || (productId === 'lainnya' ? 'Produk lainnya' : productId);
      const message = [
        `Halo ${data.site.name}, saya ${name}.`,
        `Saya ingin konsultasi produk: ${productName}.`,
        `Cabang: ${branch.name}.`,
        `Detail kebutuhan: ${details || '- '}`,
        'Mohon info harga dan estimasi produksinya. Terima kasih.'
      ].join('\n');

      const url = waUrl(branch.whatsapp, message);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  renderSiteInfo();
  renderStrip();
  renderFilters();
  renderProducts();
  renderServices();
  renderFormOptions();
  renderLocations();
  renderFooterContacts();
  bindMenu();
  bindOrderForm();
})();
