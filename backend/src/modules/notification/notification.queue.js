// Minimal in-process queue (scaffold). Replace with BullMQ/RabbitMQ later.
const queue = [];

function enqueue(job) {
  queue.push({ ...job, enqueuedAt: new Date().toISOString() });
}

function drain() {
  const jobs = queue.splice(0, queue.length);
  return jobs;
}

module.exports = { enqueue, drain };

