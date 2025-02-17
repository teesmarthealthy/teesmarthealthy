class WorkoutPlanner {
    constructor() {
        this.exercises = {
            'weight-loss': {
                beginner: {
                    cardio: ['เดินเร็ว 30 นาที', 'ปั่นจักรยาน 20 นาที', 'วิ่งเหยาะๆ 15 นาที'],
                    strength: ['สควอท 10 ครั้ง 3 เซ็ต', 'วิดพื้น 5 ครั้ง 3 เซ็ต', 'เครื่องเดินวงรี 15 นาที']
                },
                intermediate: {
                    cardio: ['วิ่ง 30 นาที', 'กระโดดเชือก 15 นาที', 'ปั่นจักรยาน HIIT 20 นาที'],
                    strength: ['สควอท 15 ครั้ง 4 เซ็ต', 'วิดพื้น 12 ครั้ง 3 เซ็ต', 'เบอร์พี 10 ครั้ง 3 เซ็ต']
                },
                advanced: {
                    cardio: ['วิ่ง HIIT 30 นาที', 'กระโดดเชือก 30 นาที', 'ปั่นจักรยานความเข้มข้นสูง 45 นาที'],
                    strength: ['สควอทกระโดด 20 ครั้ง 4 เซ็ต', 'เบอร์พี 15 ครั้ง 4 เซ็ต', 'วิดพื้น 20 ครั้ง 4 เซ็ต']
                }
            },
            // เพิ่มเป้าหมายอื่นๆ ตามต้องการ
        };
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('generatePlan').addEventListener('click', () => {
            this.generateWorkoutPlan();
        });
    }

    generateWorkoutPlan() {
        const goal = document.getElementById('workoutGoal').value;
        const intensity = document.getElementById('intensityLevel').value;
        const days = document.getElementById('daysPerWeek').value;

        const plan = this.createPlan(goal, intensity, parseInt(days));
        this.displayPlan(plan);
    }

    createPlan(goal, intensity, days) {
        const exercises = this.exercises[goal][intensity];
        const plan = [];

        for (let i = 1; i <= days; i++) {
            const dayPlan = {
                day: i,
                exercises: []
            };

            // สลับระหว่างคาร์ดิโอและเวทเทรนนิ่ง
            if (i % 2 === 0) {
                dayPlan.exercises = this.getRandomExercises(exercises.strength, 3);
            } else {
                dayPlan.exercises = this.getRandomExercises(exercises.cardio, 2);
            }

            plan.push(dayPlan);
        }

        return plan;
    }

    getRandomExercises(exercises, count) {
        const shuffled = [...exercises].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    displayPlan(plan) {
        const planContainer = document.getElementById('workoutPlan');
        planContainer.innerHTML = '';

        plan.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'workout-day animate-fade-up';
            dayElement.innerHTML = `
                <h3>วันที่ ${day.day}</h3>
                <ul class="exercise-list">
                    ${day.exercises.map(exercise => `
                        <li class="exercise-item">
                            <span>${exercise}</span>
                            <span class="exercise-details">
                                <i class="fas fa-stopwatch"></i> 
                                ${Math.floor(Math.random() * 20 + 10)} นาที
                            </span>
                        </li>
                    `).join('')}
                </ul>
            `;
            planContainer.appendChild(dayElement);
        });
    }
}

// Initialize workout planner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WorkoutPlanner();
});