// JavaScript untuk Logika Game
document.addEventListener('DOMContentLoaded', () => {
    // === DATA SOAL BERDASARKAN LEVEL ===

    // Level 1: Fakta Paling Umum dan Terkenal
    const level1Data = [
        { "clue": "Dataran tinggi paling terkenal di Banjarnegara.", "answer": "DIENG" },
        { "clue": "Minuman khas Banjarnegara yang terbuat dari santan dan cendol.", "answer": "DAWET" },
        { "clue": "Sungai terpanjang yang melintasi Banjarnegara, populer untuk arung jeram.", "answer": "SERAYU" },
        { "clue": "Buah khas Dieng yang sering diolah menjadi sirup atau manisan.", "answer": "CARICA" },
        { "clue": "Slogan atau motto Kabupaten Banjarnegara.", "answer": "GILARGILAR" },
        { "clue": "Kompleks candi Hindu tertua di Dieng.", "answer": "ARJUNA" },
        { "clue": "Kecamatan di Banjarnegara yang terkenal dengan kerajinan keramiknya.", "answer": "KLAMPOK" },
        { "clue": "Tradisi pemotongan rambut gimbal pada anak-anak di Dieng.", "answer": "RUWATAN" },
        { "clue": "Taman rekreasi dan margasatwa yang ada di kota Banjarnegara.", "answer": "SERULINGMAS" },
        { "clue": "Danau di Dieng yang airnya bisa berubah-ubah warna.", "answer": "TELAGAWARNA" },
    ];

    // Level 2: Fakta Lebih Spesifik (Nama Kecamatan, Makanan, Tempat)
    const level2Data = [
        { "clue": "Dialek bahasa Jawa yang umum digunakan di Banjarnegara.", "answer": "NGAPAK" },
        { "clue": "Kawah vulkanik di Dieng yang lokasinya konon bisa berpindah-pindah.", "answer": "SIKIDANG" },
        { "clue": "Makanan khas berupa parutan kelapa dibungkus daun talas atau singkong.", "answer": "BUNTIL" },
        { "clue": "Gunung yang menjadi tujuan pendakian populer di perbatasan Dieng.", "answer": "PRAU" },
        { "clue": "Nama stadion utama di Kabupaten Banjarnegara.", "answer": "SOEMITROKOLOPAKING" },
        { "clue": "Telaga terluas yang ada di dataran tinggi Dieng.", "answer": "MERDADA" },
        { "clue": "Pembangkit listrik yang memanfaatkan tenaga panas bumi di Dieng.", "answer": "GEOTHERMAL" },
        { "clue": "Air terjun dengan tujuh tingkatan di Kecamatan Sigaluh.", "answer": "CURUGPITU" },
        { "clue": "Pusat pemerintahan dan ibu kota Kabupaten Banjarnegara.", "answer": "BANJARNEGARA" },
        { "clue": "Taman rekreasi air modern yang populer di kota.", "answer": "SURYAYUDHA" },
    ];

    // Level 3: Fakta Mendalam (Nama Desa, Istilah Lokal, Tempat Kurang Umum)
    const level3Data = [
        { "clue": "Tarian tradisional dari Banjarnegara yang menggunakan topeng raksasa.", "answer": "RAMPAKYAKSO" },
        { "clue": "Sebutan untuk tempe goreng tepung yang digoreng setengah matang.", "answer": "MENDOAN" },
        { "clue": "Desa bersejarah di Banjarnegara yang terkenal dengan batiknya.", "answer": "GUMELEM" },
        { "clue": "Sumur raksasa atau kawah volkanik yang terisi air di Dieng.", "answer": "JALATUNDA" },
        { "clue": "Gardu pandang untuk melihat sunrise sebelum masuk area utama Dieng.", "answer": "TIENG" },
        { "clue": "Danau tertinggi di Jawa Tengah yang ada di Dieng, dijuluki 'Ranu Kumbolo-nya Dieng'.", "answer": "DRINGO" },
        { "clue": "Bupati pertama Banjarnegara setelah pindah dari Wirasaba.", "answer": "DIPAYUDA" },
        { "clue": "Waduk atau bendungan besar di perbatasan Banjarnegara-Kebumen.", "answer": "MRICAN" },
        { "clue": "Desa lokasi berdirinya Kompleks Candi Arjuna.", "answer": "PEKASIRAN" },
        { "clue": "Kecamatan yang menjadi pintu gerbang utama menuju Dieng dari sisi Banjarnegara.", "answer": "BATUR" },
    ];
    
    // Menyimpan semua data level dalam satu array
    const allLevelsData = [level1Data, level2Data, level3Data];

    // === KODE LOGIKA GAME ===

    // Element Selectors
    const clueContainer = document.getElementById('clue-container');
    const inputContainer = document.getElementById('input-container');
    const messageContainer = document.getElementById('message-container');
    const healthContainer = document.getElementById('health-container');
    const questionCounter = document.getElementById('question-counter');
    const mainGame = document.getElementById('main-game');
    const gameOverScreen = document.querySelector('.game-over');
    const gameWinScreen = document.querySelector('.game-win');

    // Game State
    let currentLevel = 1;
    let currentQuestionIndexInLevel = 0;
    let health = 5;
    let currentAnswer = '';
    let questionsForCurrentLevel = [];

    function initGame() {
        health = 5;
        currentLevel = 1;
        updateHealth();
        startLevel(currentLevel);
        mainGame.style.display = 'block';
        gameOverScreen.style.display = 'none';
        gameWinScreen.style.display = 'none';
    }
    
    function startLevel(levelNumber) {
        // Cek jika sudah menyelesaikan semua level
        if (levelNumber > allLevelsData.length) {
            endGame(true); // Menang
            return;
        }

        // Ambil data soal untuk level ini dan acak
        questionsForCurrentLevel = [...allLevelsData[levelNumber - 1]].sort(() => Math.random() - 0.5);
        currentQuestionIndexInLevel = 0;
        
        // Tampilkan pesan "Naik Level"
        clueContainer.textContent = `LEVEL ${levelNumber}`;
        messageContainer.textContent = 'Bersiap!';
        inputContainer.innerHTML = '';
        questionCounter.textContent = `Level ${levelNumber}`;
        
        // Mulai soal pertama setelah jeda
        setTimeout(() => {
            loadQuestion();
        }, 2500);
    }

    function loadQuestion() {
        // Cek jika semua soal di level ini sudah selesai
        if (currentQuestionIndexInLevel >= questionsForCurrentLevel.length) {
            currentLevel++;
            startLevel(currentLevel); // Pindah ke level selanjutnya
            return;
        }

        // Clear previous state
        messageContainer.textContent = '';
        inputContainer.innerHTML = '';

        const question = questionsForCurrentLevel[currentQuestionIndexInLevel];
        currentAnswer = question.answer.toUpperCase().replace(/\s/g, ''); // Hapus spasi dari jawaban
        
        clueContainer.textContent = question.clue;
        questionCounter.textContent = `Level ${currentLevel} | Soal ${currentQuestionIndexInLevel + 1}/${questionsForCurrentLevel.length}`;

        // Create input boxes
        currentAnswer.split('').forEach(() => {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            inputContainer.appendChild(input);
        });

        setupInputListeners();
    }

    function setupInputListeners() {
        const inputs = inputContainer.querySelectorAll('input');
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', (e) => {
                if (!/^[a-zA-Z0-9]$/.test(e.key)) {
                    if (e.key === 'Backspace' && index > 0) {
                        inputs[index - 1].focus();
                    }
                    return;
                }
                
                input.value = input.value.toUpperCase();
                checkAnswer(input, index);
                
                if (index < inputs.length - 1 && input.value !== '') {
                    inputs[index + 1].focus();
                }
                
                checkWinCondition();
            });
        });
        inputs[0].focus();
    }

    function checkAnswer(input, index) {
        const letter = input.value;
        const answerLetter = currentAnswer[index];
        
        input.classList.remove('correct', 'wrong-position', 'wrong');

        if (letter === answerLetter) {
            input.classList.add('correct');
        } else if (currentAnswer.includes(letter)) {
            input.classList.add('wrong-position');
        } else {
            input.classList.add('wrong');
            updateHealth(-1);
        }
    }

    function updateHealth(change = 0) {
        if (change < 0) {
            const heart = healthContainer.querySelector(`span:nth-child(${health})`);
            if(heart) heart.style.transform = 'scale(0)';
        }
        health += change;
        
        let healthHTML = '';
        for(let i = 0; i < 5; i++) {
            healthHTML += `<span style="transform: ${i < health ? 'scale(1)' : 'scale(0)'};">❤️</span>`;
        }
        healthContainer.innerHTML = healthHTML;

        if (health <= 0) {
            endGame(false); // Kalah
        }
    }
    
    function checkWinCondition() {
        const inputs = inputContainer.querySelectorAll('input');
        const allCorrect = [...inputs].every(input => input.classList.contains('correct'));

        if(allCorrect) {
            messageContainer.style.color = '#28a745';
            messageContainer.textContent = 'Benar! Soal berikutnya...';
            
            inputs.forEach(input => input.disabled = true);
            
            setTimeout(() => {
                currentQuestionIndexInLevel++; // Pindah ke indeks soal selanjutnya
                loadQuestion();
            }, 2000);
        }
    }

    function endGame(isWin) {
        mainGame.style.display = 'none';
        if (isWin) {
            gameWinScreen.style.display = 'block';
        } else {
            gameOverScreen.style.display = 'block';
        }
    }
    
    // Memulai permainan
    initGame();
});