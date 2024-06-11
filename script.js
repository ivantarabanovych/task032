// Отримання елементу canvas та контексту для малювання
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Початкові параметри кола
let x = 50; // Початкова позиція x
let y = 50; // Початкова позиція y
let radius = 30; // Радіус кола
let dx = 3; // Швидкість зміщення по осі x
let dy = 3; // Швидкість зміщення по осі y

// Початкові кольори градієнта
let color1 = 0; // Початковий колір 1 градієнта
let color2 = 100; // Початковий колір 2 градієнта

// Функція для малювання градієнта фону
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); // Створення лінійного градієнта
  gradient.addColorStop(0, "gray"); // Початковий колір градієнта
  gradient.addColorStop(1, "black"); // Кінцевий колір градієнта
  ctx.fillStyle = gradient; // Застосування градієнта як стилю заливки
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Заповнення всього фону градієнтом
}

// Функція для малювання кола з градієнтом
function drawCircle() {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius); // Створення радіального градієнта
  gradient.addColorStop(0, `hsl(${color1}, 100%, 50%)`); // Початковий колір градієнта
  gradient.addColorStop(1, `hsl(${color2}, 100%, 50%)`); // Кінцевий колір градієнта
  ctx.fillStyle = gradient; // Застосування градієнта як стилю заливки
  ctx.beginPath(); // Початок малювання кола
  ctx.arc(x, y, radius, 0, Math.PI * 2, false); // Малювання кола
  ctx.fill(); // Заливка кола градієнтом
  ctx.closePath(); // Завершення малювання кола
}

// Функція для оновлення положення та анімації кола
function update() {
  // Очищуємо canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищення всього canvas

  // Малювання фону
  drawBackground(); // Виклик функції для малювання фону

  // Малювання кола
  drawCircle(); // Виклик функції для малювання кола

  // Оновлення положення кола
  x += dx; // Зміщення кола по осі x
  y += dy; // Зміщення кола по осі y

  // Оновлення кольору градієнта
  color1 = (color1 + 1) % 360; // Зміна кольору градієнта 1
  color2 = (color2 + 1) % 360; // Зміна кольору градієнта 2

  // Перевірка меж canvas для відскоку
  if (x + radius > canvas.width || x - radius < 0) {
    // Перевірка правої та лівої межі
    dx *= -1; // Зміна напрямку руху по осі x
  }
  if (y + radius > canvas.height || y - radius < 0) {
    // Перевірка верхньої та нижньої межі
    dy *= -1; // Зміна напрямку руху по осі y
  }

  requestAnimationFrame(update); // Запуск наступного кадру анімації
}

// Функція для зміни напрямку руху кола при кліку мишкою
canvas.addEventListener("click", () => {
  dx *= -1; // Зміна напрямку руху по осі x при кліку
  dy *= -1; // Зміна напрямку руху по осі y при кліку
});

// Функція для зміни розміру кола при натисканні клавіш вгору, вниз
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    // Перевірка, чи натиснута клавіша вгору
    radius += 6; // Збільшення радіусу кола
  } else if (e.key === "ArrowDown") {
    // Перевірка, чи натиснута клавіша вниз
    radius -= 6; // Зменшення радіусу кола
  }
});

// Запуск анімації
update(); // Виклик функції оновлення для запуску анімації
