// Web Speech API의 SpeechSynthesisUtterance 객체 준비
const synth = window.speechSynthesis;

// DOM 요소 참조
const statusBox = document.getElementById('statusBox');
const statusIcon = document.getElementById('statusIcon');
const statusTitle = document.getElementById('statusTitle');
const statusDesc = document.getElementById('statusDesc');

/**
 * 텍스트를 음성(TTS)으로 출력하는 함수
 * @param {string} text - 읽을 안내 문구
 */
function speak(text) {
    // 재생 중인 기존 음성이 있다면 즉시 중단
    if (synth.speaking) {
        synth.cancel();
    }

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = 'ko-KR'; // 한국어 설정
    utterThis.rate = 0.95;   // 전달력을 위해 보통(1.0)보다 살짝 천천히 읽기
    utterThis.pitch = 1.0;   // 음높이

    synth.speak(utterThis);
}

/**
 * 교통 상황 변경 함수
 * @param {string} state - 'normal' (원활) 또는 'detour' (혼잡/우회)
 */
function setStatus(state) {
    if (state === 'detour') {
        // 혼잡/차단 상태로 UI 및 텍스트 변경
        statusBox.className = 'status-box status-detour';
        statusIcon.textContent = '⛔';
        statusTitle.textContent = '차단중 - 우회하세요';
        statusDesc.textContent = '현재 등하교 시간으로 혼잡합니다.\n큰 도로로 우회하여 주십시오.';

        // 음성 안내 발송
        speak('등하교 시간 차량 밀집으로 일방통행로가 차단되었습니다. 큰 도로로 우회하여 주시기 바랍니다.');
    } else {
        // 원활/통행가능 상태로 UI 및 텍스트 변경
        statusBox.className = 'status-box status-normal';
        statusIcon.textContent = '🚗';
        statusTitle.textContent = '통행 가능';
        statusDesc.textContent = '현재 서행하여 일방통행로 진입이 가능합니다.';

        // 음성 안내 발송
        speak('현재 서행하여 일방통행로 진입이 가능합니다.');
    }
}
