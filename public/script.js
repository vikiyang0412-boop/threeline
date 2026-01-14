// DOM 요소 선택
const wordInput = document.getElementById('wordInput');
const generateBtn = document.getElementById('generateBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultSection = document.getElementById('resultSection');
const resultText = document.getElementById('resultText');
const errorSection = document.getElementById('errorSection');
const errorText = document.getElementById('errorText');

// 페이지 로드 시 입력창에 포커스
window.addEventListener('DOMContentLoaded', () => {
    wordInput.focus();
});

// 버튼 클릭 이벤트
generateBtn.addEventListener('click', generateThreeline);

// 엔터키 이벤트
wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateThreeline();
    }
});

// 입력창 변경 시 에러 숨기기
wordInput.addEventListener('input', () => {
    hideError();
});

// 메인 함수: 삼행시 생성
async function generateThreeline() {
    const word = wordInput.value.trim();

    // 입력 유효성 검사
    if (!word) {
        showError('단어를 입력해주세요.');
        return;
    }

    // 3글자 확인 (한글, 영문, 숫자 등 모두 지원)
    if (word.length !== 3) {
        showError('정확히 3글자를 입력해주세요.');
        return;
    }

    // UI 상태 업데이트
    showLoading();
    hideError();
    hideResult();
    generateBtn.disabled = true;

    try {
        // API 호출
        const response = await fetch('/api/generate-threeline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word }),
        });

        // 응답 확인
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        // 결과 파싱
        const data = await response.json();
        showResult(data.result);

    } catch (error) {
        console.error('Error:', error);

        // 에러 메시지 설정
        let errorMessage = '삼행시 생성에 실패했습니다. 다시 시도해주세요.';

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage = '네트워크 연결을 확인해주세요.';
        } else if (error.message.includes('timeout')) {
            errorMessage = '응답 시간이 초과되었습니다. 다시 시도해주세요.';
        }

        showError(errorMessage);
    } finally {
        // UI 상태 복원
        hideLoading();
        generateBtn.disabled = false;
        wordInput.focus();
    }
}

// 헬퍼 함수: 로딩 표시
function showLoading() {
    loadingSpinner.style.display = 'block';
}

// 헬퍼 함수: 로딩 숨기기
function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// 헬퍼 함수: 결과 표시
function showResult(text) {
    resultText.textContent = text;
    resultSection.style.display = 'block';
}

// 헬퍼 함수: 결과 숨기기
function hideResult() {
    resultSection.style.display = 'none';
}

// 헬퍼 함수: 에러 표시
function showError(message) {
    errorText.textContent = message;
    errorSection.style.display = 'block';
}

// 헬퍼 함수: 에러 숨기기
function hideError() {
    errorSection.style.display = 'none';
}
