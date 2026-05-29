import pytest
import allure
import time
from pages.main_page import MainPage

@allure.feature("Карточки мест")
@allure.story("Полный жизненный цикл карточки (создание, лайк, удаление)")
def test_card_lifecycle(driver):
  main_page = MainPage(driver)
    
  # 1. Открываем сайт
  main_page.open()
    
  # 2. Открываем попап добавления карточки
  main_page.open_add_card_popup()
    
  # 3. Создаем новую карточку
  card_title = "Камчатка Автотест"
  card_link = "https://images.unsplash.com/photo-1548697143-6a9dc9d9d80f"
  main_page.create_new_card(card_title, card_link)
    
  # Проверяем, что карточка действительно появилась первой в списке
  assert main_page.get_first_card_title() == card_title, "Новая карточка не появилась в топе списка!"
    
  # 4. Проверяем работу лайка
  # Получаем текущее количество лайков (приводим к int, так как там строка)
  initial_likes = int(main_page.get_first_card_likes())
    
  main_page.like_first_card()
    
  # Даем бэкенду (Api.js) одну секунду, чтобы обработать запрос и обновить DOM
  time.sleep(1) 
    
  new_likes = int(main_page.get_first_card_likes())
  assert new_likes == initial_likes + 1, "Количество лайков не увеличилось после клика!"

  # 5. Удаляем созданную карточку, чтобы почистить за собой данные
  main_page.delete_first_card()
    
  # Небольшая пауза на обновление списка после удаления
  time.sleep(1)
    
  # Проверяем, что верхняя карточка теперь имеет другое название (наша удалилась)
  assert main_page.get_first_card_title() != card_title, "Карточка не удалилась из списка!"