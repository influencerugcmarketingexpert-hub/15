/**
 * Custom Mega Menu Web Component
 * Handles hover/click dropdowns, mobile drawer, sticky behavior, and accessibility.
 */
if (!customElements.get('custom-mega-menu')) {
  class CustomMegaMenu extends HTMLElement {
    constructor() {
      super();
      this.activeDropdown = null;
      this.hoverTimeout = null;
      this.leaveTimeout = null;
      this.hoverDelay = 150;
      this.leaveDelay = 200;
      this.isDrawerOpen = false;
      this.lastScrollY = 0;
    }

    connectedCallback() {
      this.trigger = this.dataset.trigger || 'hover';
      this.mobileLayout = this.dataset.mobileLayout || 'drawer-left';
      this.sectionId = this.dataset.sectionId;

      this.navItems = this.querySelectorAll('.cmm__nav-item--has-dropdown');
      this.mobileToggle = this.querySelector('.cmm__mobile-toggle');
      this.mobileDrawer = this.querySelector('.cmm__mobile-drawer');
      this.mobileClose = this.querySelector('.cmm__mobile-close');
      this.backdrop = this.querySelector('.cmm__backdrop');
      this.submenuToggles = this.querySelectorAll('.cmm__mobile-submenu-toggle');

      this.bindEvents();
    }

    disconnectedCallback() {
      this.unbindEvents();
    }

    bindEvents() {
      // Desktop dropdown events
      this.handleNavItemEnter = this.handleNavItemEnter.bind(this);
      this.handleNavItemLeave = this.handleNavItemLeave.bind(this);
      this.handleNavItemClick = this.handleNavItemClick.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.handleBackdropClick = this.handleBackdropClick.bind(this);

      this.navItems.forEach((item) => {
        if (this.trigger === 'hover') {
          item.addEventListener('mouseenter', this.handleNavItemEnter);
          item.addEventListener('mouseleave', this.handleNavItemLeave);
        }

        const link = item.querySelector('.cmm__nav-link');
        if (link) {
          link.addEventListener('click', this.handleNavItemClick);
        }
      });

      // Mobile events
      if (this.mobileToggle) {
        this.handleMobileOpen = this.openDrawer.bind(this);
        this.mobileToggle.addEventListener('click', this.handleMobileOpen);
      }

      if (this.mobileClose) {
        this.handleMobileClose = this.closeDrawer.bind(this);
        this.mobileClose.addEventListener('click', this.handleMobileClose);
      }

      if (this.backdrop) {
        this.backdrop.addEventListener('click', this.handleBackdropClick);
      }

      // Mobile submenu toggles
      this.submenuToggles.forEach((toggle) => {
        toggle.addEventListener('click', this.handleSubmenuToggle.bind(this));
      });

      // Keyboard
      document.addEventListener('keydown', this.handleKeyDown);

      // Sticky scroll
      if (this.classList.contains('cmm--sticky')) {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
      }
    }

    unbindEvents() {
      this.navItems.forEach((item) => {
        item.removeEventListener('mouseenter', this.handleNavItemEnter);
        item.removeEventListener('mouseleave', this.handleNavItemLeave);

        const link = item.querySelector('.cmm__nav-link');
        if (link) {
          link.removeEventListener('click', this.handleNavItemClick);
        }
      });

      if (this.mobileToggle) {
        this.mobileToggle.removeEventListener('click', this.handleMobileOpen);
      }

      if (this.mobileClose) {
        this.mobileClose.removeEventListener('click', this.handleMobileClose);
      }

      if (this.backdrop) {
        this.backdrop.removeEventListener('click', this.handleBackdropClick);
      }

      document.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('scroll', this.handleScroll);

      clearTimeout(this.hoverTimeout);
      clearTimeout(this.leaveTimeout);
    }

    /* ------------------------------------------------------------------
       Desktop Dropdown Handlers
       ------------------------------------------------------------------ */

    handleNavItemEnter(event) {
      const item = event.currentTarget;

      clearTimeout(this.leaveTimeout);

      this.hoverTimeout = setTimeout(() => {
        this.openDropdown(item);
      }, this.hoverDelay);
    }

    handleNavItemLeave(event) {
      clearTimeout(this.hoverTimeout);

      this.leaveTimeout = setTimeout(() => {
        this.closeAllDropdowns();
      }, this.leaveDelay);
    }

    handleNavItemClick(event) {
      const link = event.currentTarget;
      const item = link.closest('.cmm__nav-item--has-dropdown');

      if (!item) return;

      if (this.trigger === 'click' || this.trigger === 'hover') {
        event.preventDefault();

        if (item.classList.contains('cmm__nav-item--active')) {
          this.closeAllDropdowns();
        } else {
          this.openDropdown(item);
        }
      }
    }

    openDropdown(item) {
      if (this.activeDropdown && this.activeDropdown !== item) {
        this.closeAllDropdowns();
      }

      item.classList.add('cmm__nav-item--active');

      const link = item.querySelector('.cmm__nav-link');
      const dropdown = item.querySelector('.cmm__dropdown');

      if (link) {
        link.setAttribute('aria-expanded', 'true');
      }

      if (dropdown) {
        dropdown.setAttribute('aria-hidden', 'false');
      }

      this.activeDropdown = item;
      this.showBackdrop();
    }

    closeAllDropdowns() {
      this.navItems.forEach((item) => {
        item.classList.remove('cmm__nav-item--active');

        const link = item.querySelector('.cmm__nav-link');
        const dropdown = item.querySelector('.cmm__dropdown');

        if (link) {
          link.setAttribute('aria-expanded', 'false');
        }

        if (dropdown) {
          dropdown.setAttribute('aria-hidden', 'true');
        }
      });

      this.activeDropdown = null;
      this.hideBackdrop();
    }

    /* ------------------------------------------------------------------
       Mobile Drawer Handlers
       ------------------------------------------------------------------ */

    openDrawer() {
      if (!this.mobileDrawer) return;

      this.mobileDrawer.classList.add('cmm__mobile-drawer--open');
      this.mobileDrawer.setAttribute('aria-hidden', 'false');
      this.isDrawerOpen = true;

      if (this.mobileToggle) {
        this.mobileToggle.setAttribute('aria-expanded', 'true');
      }

      this.showBackdrop();
      document.body.style.overflow = 'hidden';
    }

    closeDrawer() {
      if (!this.mobileDrawer) return;

      this.mobileDrawer.classList.remove('cmm__mobile-drawer--open');
      this.mobileDrawer.setAttribute('aria-hidden', 'true');
      this.isDrawerOpen = false;

      if (this.mobileToggle) {
        this.mobileToggle.setAttribute('aria-expanded', 'false');
      }

      this.hideBackdrop();
      document.body.style.overflow = '';
    }

    handleSubmenuToggle(event) {
      const toggle = event.currentTarget;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const item = toggle.closest('.cmm__mobile-item');
      const submenu = item ? item.querySelector('.cmm__mobile-submenu') : null;

      if (!submenu) return;

      if (isExpanded) {
        toggle.setAttribute('aria-expanded', 'false');
        submenu.setAttribute('aria-hidden', 'true');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        submenu.setAttribute('aria-hidden', 'false');
      }
    }

    /* ------------------------------------------------------------------
       Backdrop
       ------------------------------------------------------------------ */

    showBackdrop() {
      if (this.backdrop) {
        this.backdrop.classList.add('cmm__backdrop--visible');
        this.backdrop.setAttribute('aria-hidden', 'false');
      }
    }

    hideBackdrop() {
      if (this.backdrop) {
        this.backdrop.classList.remove('cmm__backdrop--visible');
        this.backdrop.setAttribute('aria-hidden', 'true');
      }
    }

    handleBackdropClick() {
      this.closeAllDropdowns();
      this.closeDrawer();
    }

    /* ------------------------------------------------------------------
       Keyboard Handling
       ------------------------------------------------------------------ */

    handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (this.isDrawerOpen) {
          this.closeDrawer();
        } else if (this.activeDropdown) {
          this.closeAllDropdowns();
          const link = this.activeDropdown
            ? this.activeDropdown.querySelector('.cmm__nav-link')
            : null;
          if (link) {
            link.focus();
          }
        }
      }
    }

    /* ------------------------------------------------------------------
       Sticky / Scroll
       ------------------------------------------------------------------ */

    handleScroll() {
      const scrollY = window.scrollY;

      if (scrollY > 10) {
        this.classList.add('cmm--scrolled');
      } else {
        this.classList.remove('cmm--scrolled');
      }

      this.lastScrollY = scrollY;
    }
  }

  customElements.define('custom-mega-menu', CustomMegaMenu);
}
