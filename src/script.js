const script = () => {
    document.addEventListener('DOMContentLoaded', function () {
      'use-strict';
    
      const themeSwitcher = {
        init: function () {
          this.wrapper = document.getElementById('theme-switcher-wrapper');
    
          if (!this.wrapper) {
            console.error("El elemento con el ID 'theme-switcher-wrapper' no se encontró.");
            return;
          }
    
          this.button = document.getElementById('theme-switcher-button');
          this.theme = this.wrapper.querySelectorAll('[data-theme]');
          this.themes = ['theme-orange', 'theme-purple', 'theme-green', 'theme-blue'];
          this.events();
          this.loadPersistedTheme(); // Cargar tema desde localStorage o establecer el tema predeterminado
        },
    
        events: function () {
          this.button.addEventListener('click', this.displayed.bind(this), false);
          this.theme.forEach(theme => theme.addEventListener('click', this.themed.bind(this), false));
        },
    
        start: function () {
          let theme = this.themes[0]; // Establecer el tema predeterminado en orange
          document.body.classList.add(theme);
          this.saveThemeToLocalStorage(theme); // Guardar tema inicial en localStorage
        },
    
        displayed: function () {
          this.wrapper.classList.toggle('is-open');
        },
    
        themed: function (e) {
          const selectedTheme = `theme-${e.currentTarget.dataset.theme}`;
          this.themes.forEach(theme => document.body.classList.remove(theme));
          document.body.classList.add(selectedTheme);
          this.saveThemeToLocalStorage(selectedTheme); // Guardar tema seleccionado en localStorage
        },
    
        saveThemeToLocalStorage: function (theme) {
          localStorage.setItem('selectedTheme', theme);
        },
    
        loadPersistedTheme: function () {
          const persistedTheme = localStorage.getItem('selectedTheme');
          if (!persistedTheme && document.body) {
            this.start(); // Si no hay tema persistido, establecer el tema predeterminado
          } else if (document.body) {
            this.themes.forEach(theme => document.body.classList.remove(theme));
            document.body.classList.add(persistedTheme);
          }
        },
      };
    
      themeSwitcher.init();
    });
  }
  export default script;