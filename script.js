const projectData = {
  leadbot: {
    title: "LeadFlow — бот заявок",
    description: "Демонстрационный Telegram-бот, который помогает небольшому бизнесу собирать заявки в едином формате и передавать их ответственному сотруднику.",
    features: ["Пошаговая форма и проверка обязательных полей", "Сохранение заявок в базе данных", "Уведомление администратора и просмотр новых обращений", "Конфигурация через переменные окружения"],
    tags: ["Python", "aiogram", "SQLite", "Pydantic"]
  },
  reporter: {
    title: "ReportFlow — автоматические отчёты",
    description: "Пример конвейера обработки табличных данных с формированием сводки и доставкой результата в Telegram.",
    features: ["Проверка входного CSV-файла", "Расчёт основных показателей", "Логирование ошибок и пропущенных данных", "Отправка отчёта по расписанию"],
    tags: ["Python", "Pandas", "APScheduler", "Telegram Bot API"]
  },
  fastapi: {
    title: "Order API — сервис заказов",
    description: "Демонстрационный REST API для базового жизненного цикла заказа с документацией и проверкой входных данных.",
    features: ["Создание и получение заказов", "Валидация запросов и единый формат ошибок", "Документация OpenAPI", "Тесты ключевых endpoint'ов"],
    tags: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Pytest"]
  },
  support: {
    title: "HelpDesk Bot — поддержка",
    description: "Бот-посредник между клиентом и командой поддержки: создаёт обращение и сохраняет переписку в рамках тикета.",
    features: ["Создание тикета с уникальным номером", "Передача сообщения оператору", "Ответ клиенту через административный интерфейс чата", "Статусы обращения и журнал событий"],
    tags: ["Python", "aiogram", "FSM", "PostgreSQL"]
  },
  parser: {
    title: "DataCleaner — обработка данных",
    description: "Инструмент для подготовки табличных данных к дальнейшему анализу: проверяет структуру, очищает значения и создаёт отчёт.",
    features: ["Проверка колонок и типов данных", "Обработка пустых и дублирующихся значений", "Экспорт очищенного файла", "Отчёт об изменениях"],
    tags: ["Python", "Pandas", "CSV", "Excel"]
  },
  auth: {
    title: "SecureGate — сервис авторизации",
    description: "Учебный пример backend-сервиса с регистрацией, входом и разграничением доступа. Перед production-использованием требуется полноценный security review.",
    features: ["Хеширование паролей проверенным алгоритмом", "Валидация данных пользователя", "Токены доступа и защищённые endpoint'ы", "Тесты сценариев авторизации"],
    tags: ["FastAPI", "JWT", "SQLAlchemy", "Pytest"]
  },
  booking: {
    title: "Slotly — онлайн-запись",
    description: "Демонстрационный бот для выбора услуги и свободного времени, подтверждения записи и напоминания перед визитом.",
    features: ["Просмотр доступных временных слотов", "Защита от двойного бронирования", "Подтверждение и отмена записи", "Напоминания по расписанию"],
    tags: ["Python", "aiogram", "PostgreSQL", "Asyncio"]
  },
  monitor: {
    title: "PulseWatch — мониторинг",
    description: "Небольшой сервис, который периодически проверяет доступность заданных endpoint'ов и отправляет оповещение при сбое.",
    features: ["Проверки HTTP-статуса и времени ответа", "Настраиваемые интервалы проверки", "Telegram-оповещения об ошибках", "Логирование результатов проверок"],
    tags: ["Python", "HTTPX", "Asyncio", "Logging"]
  }
};

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalFeatures = document.getElementById("modalFeatures");
const modalTags = document.getElementById("modalTags");
const modalEyebrow = document.getElementById("modalEyebrow");
function openProject(key) {
  const project = projectData[key];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalFeatures.replaceChildren(...project.features.map(feature => {
    const li = document.createElement("li");
    li.textContent = feature;
    return li;
  }));
  modalTags.replaceChildren(...project.tags.map(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    return span;
  }));
  modalEyebrow.textContent = "DEMO CASE / " + key.toUpperCase();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.open));
});
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
