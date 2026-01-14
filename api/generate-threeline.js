import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (프리플라이트)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST 메서드만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 환경변수에서 API 키 로드
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // 요청 body에서 단어 추출
    const { word } = req.body;

    // 입력 유효성 검사
    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }

    if (word.length !== 3) {
      return res.status(400).json({ error: 'Word must be exactly 3 characters' });
    }

    // Anthropic 클라이언트 초기화
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Claude API 호출 (prompt.md의 정확한 파라미터 사용)
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 20000,
      temperature: 1,
      system: `당신은 삼행시 작가입니다.
사용자가 입력한 3글자로 삼행시를 작성하세요.

규칙:
1. 각 글자로 시작하는 문장을 작성합니다
2. 긍정적이고 유머러스한 톤을 유지합니다
3. 각 줄은 자연스럽게 이어져야 합니다

출력 형식 (반드시 이 형식만 출력):
[첫번째글자]: [문장]
[두번째글자]: [문장]
[세번째글자]: [문장]

주의: 삼행시 3줄만 출력하세요. 인사말, 설명, 부연설명 등 다른 텍스트는 절대 포함하지 마세요.`,
      messages: [
        {
          role: "user",
          content: word
        }
      ]
    });

    // 응답에서 텍스트 추출
    const result = message.content[0].text;

    // 성공 응답
    return res.status(200).json({ result });

  } catch (error) {
    console.error('Error generating threeline:', error);
    return res.status(500).json({
      error: 'Failed to generate threeline',
      message: error.message
    });
  }
}
