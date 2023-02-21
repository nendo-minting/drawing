const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let penColor = '#000000';
let penSize = 5;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

document.getElementById('pen').addEventListener('click', setPenTool);
document.getElementById('eraser').addEventListener('click', setEraserTool);
document.getElementById('clear').addEventListener('click', clearCanvas);

function startDrawing(event) {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
}

function draw(event) {
  if (!isDrawing) return;

  ctx.lineWidth = penSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = penColor;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();

  lastX = event.offsetX;
  lastY = event.offsetY;
}

function stopDrawing() {
  isDrawing = false;
}

function setPenTool() {
  document.querySelectorAll('.tool').forEach(tool => tool.classList.remove('active'));
  document.getElementById('pen').classList.add('active');
  penColor = '#000000';
  penSize = 5;
  canvas.style.cursor = 'crosshair';
}

function setEraserTool() {
  document.querySelectorAll('.tool').forEach(tool => tool.classList.remove('active'));
  document.getElementById('eraser').classList.add('active');
  penColor = '#FFFFFF';
  penSize = 20;
  canvas.style.cursor = 'url(https://draw.kuku.lu/eraser.png) 10 10, crosshair';
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
