const fs = require("fs");
const path = require("path");
const readline = require("readline");

// readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 질문을 하고 답변을 받는 함수
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

(async () => {
  // 사용자 입력 받기
  const userName = await askQuestion("Enter the user name: ");
  const baseName = await askQuestion("Enter the base name: ");
  const weekNumber = await askQuestion("Enter the week: ");
  const extension = await askQuestion(
    "Enter the file extension (e.g., .txt): "
  );
  const numFiles = await askQuestion(
    "Enter the number of files to create (e.g., 1(from), 5(to)): "
  );

  // 파일 생성 경로 설정
  const outputDir = path.join(__dirname, userName, weekNumber);

  // 폴더가 없으면 생성 (하위 폴더까지)
  // if (!fs.existsSync(outputDir)) {
  //   fs.mkdirSync(outputDir, { recursive: true });
  // }

  // 폴더가 없으면 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fromNumber = numFiles.split(",")[0];
  const toNumber = numFiles.split(",")[1];

  // 파일 생성
  for (let i = fromNumber; i <= toNumber; i++) {
    const fileName = `${baseName}${i}${extension}`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, "");
    console.log(`Created: ${filePath}`);
  }

  // readline 인터페이스 종료
  rl.close();
})();
