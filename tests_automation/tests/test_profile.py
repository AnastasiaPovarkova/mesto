import pytest
import allure
from pages.main_page import MainPage

@allure.feature("Профиль пользователя")
@allure.story("Редактирование данных профиля")
def test_edit_profile_success(driver):
  main_page = MainPage(driver)
    
  # 1. Открываем сайт
  main_page.open()
    
  # 2. Открываем попап редактирования
  main_page.open_edit_profile_popup()
    
  # 3. Вводим новые данные
  new_name = "Новое имя"
  new_profession = "Новая профессия"
  main_page.fill_profile_data(new_name, new_profession)
    
  # 4. Сохраняем
  main_page.save_profile()
    
  # 5. Проверяем, что данные обновились на странице с учетом задержки бэкенда
  is_name_updated = main_page.wait_for_profile_name(new_name)
  is_profession_updated = main_page.wait_for_profile_profession(new_profession)
    
  assert is_name_updated, f"Имя профиля не изменилось на '{new_name}'!"
  assert is_profession_updated, f"Профессия не изменилась на '{new_profession}'!"

  # 2. Открываем попап редактирования
  main_page.open_edit_profile_popup()
    
  # 3. Вводим новые данные
  new_name = "Жак-Ив Кусто Тестер"
  new_profession = "Автоматизатор океана"
  main_page.fill_profile_data(new_name, new_profession)
    
  # 4. Сохраняем
  main_page.save_profile()
    
  # 5. Проверяем, что данные обновились на странице с учетом задержки бэкенда
  is_name_updated = main_page.wait_for_profile_name(new_name)
  is_profession_updated = main_page.wait_for_profile_profession(new_profession)
    
  assert is_name_updated, f"Имя профиля не изменилось на '{new_name}'!"
  assert is_profession_updated, f"Профессия не изменилась на '{new_profession}'!"