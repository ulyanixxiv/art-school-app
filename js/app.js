/**
 * Лабораторная работа № 5: «Детская творческая школа "Арт-Умка"»
 * Интерактивный модуль управления экранами, фильтрами и записью на уроки
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Управление логическими экранами приложения (3 экрана)
  const screens = {
    catalog: document.getElementById('screen-catalog'),
    detail: document.getElementById('screen-detail'),
    profile: document.getElementById('screen-profile')
  };

  const navLinks = document.querySelectorAll('[data-target-screen]');
  const tabbarItems = document.querySelectorAll('.tabbar-item');

  function showScreen(screenId) {
    // Скрываем все экраны
    Object.values(screens).forEach(screen => {
      if (screen) screen.classList.remove('active-screen');
    });

    // Показываем целевой экран
    if (screens[screenId]) {
      screens[screenId].classList.add('active-screen');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Обновляем активные ссылки в шапке
    navLinks.forEach(link => {
      if (link.dataset.targetScreen === screenId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Обновляем активные табы в мобильном TabBar
    tabbarItems.forEach(tab => {
      if (tab.dataset.targetScreen === screenId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  // Навешиваем слушатели на все элементы переключения экранов
  document.querySelectorAll('[data-target-screen]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScreen = trigger.dataset.targetScreen;
      showScreen(targetScreen);
    });
  });

  // 2. Фильтрация курсов в каталоге (Чипсы категорий)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseItems = document.querySelectorAll('.course-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      courseItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. Переключение профиля ребенка в Личном кабинете
  const childChips = document.querySelectorAll('.child-chip');
  const childNameDisplay = document.getElementById('current-child-name');

  childChips.forEach(chip => {
    chip.addEventListener('click', () => {
      childChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      if (childNameDisplay && chip.dataset.childName) {
        childNameDisplay.textContent = chip.dataset.childName;
      }
    });
  });

  // 4. Обработка отправки формы бронирования на пробный урок
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('child-name-input');
      const phoneInput = document.getElementById('parent-phone-input');

      alert(`🎉 Успешно! Ребенок ${nameInput.value} записан(а) на бесплатный пробный урок (0 BYN). Мы позвоним на номер ${phoneInput.value} для подтверждения времени.`);
      bookingForm.reset();
    });
  }
});
