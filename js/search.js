// search.js

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');
  const wordInput = document.getElementById('word-input');
  const errorDiv = document.querySelector('.error');
  const resultsDiv = document.querySelector('.results');

  // Отображение всех слов из словаря при загрузке страницы
  displayAllWords();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    search();
  });

  wordInput.addEventListener('change', function () {
    if (wordInput.value.trim() === '') {
      // Если строка поиска пуста, то отображаем все слова
      displayAllWords();
    }
  });

  wordInput.addEventListener('input', function () {
    // При каждом вводе символа вызываем функцию поиска
    search();
  });

  function displayAllWords() {
    resultsDiv.classList.remove('hidden');
    for (const word in dictionary) {
      const resultItem = document.createElement('div');
      resultItem.classList.add('results-item'); // Добавляем класс для новых стилей
      resultItem.innerHTML = `<strong>${word}:</strong> ${dictionary[word]}`;
      resultsDiv.appendChild(resultItem);
    }
  }

  function search() {
    let searchTerm = wordInput.value.trim().toLowerCase();

    // Очищаем предыдущие результаты и ошибки
    resultsDiv.innerHTML = '';
    errorDiv.style.display = 'none';

    // Если поле ввода пустое после удаления пробелов, отображаем все слова
    if (searchTerm === '') {
      displayAllWords();
      return;
    }

    // Ищем совпадения в словаре, только те слова, которые начинаются с введенных символов
    const matchingWords = Object.keys(dictionary).filter((word) =>
      word.toLowerCase().startsWith(searchTerm)
    );

    if (matchingWords.length === 0) {
      // Показываем сообщение об ошибке и скрываем результаты
      errorDiv.style.display = 'block';
      resultsDiv.classList.add('hidden');
    } else {
      // Показываем результаты и скрываем сообщение об ошибке
      resultsDiv.classList.remove('hidden');
      errorDiv.style.display = 'none';

      matchingWords.forEach((word) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('results-item', 'search-results'); // Добавляем класс для новых стилей
        resultItem.innerHTML = `<strong>${word}:</strong> ${dictionary[word]}`;
        resultsDiv.appendChild(resultItem);
      });
    }
  }

  const scrollToTopButton = document.querySelector('.scroll-to-top');

  // Показываем/скрываем кнопку "В начало" при прокрутке страницы
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });

  // Прокрутка страницы вверх при клике на кнопку "В начало"
  scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
