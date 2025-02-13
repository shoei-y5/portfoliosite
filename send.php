<?php
// 文字エンコーディングを指定
mb_language("Japanese");
mb_internal_encoding("UTF-8");

// 送信先メールアドレス
$to = "yoshida.s178@gmail.com"; // ★ここを変更

// フォームからの入力値を取得
$name = isset($_POST["name"]) ? trim($_POST["name"]) : "未記入";
$furigana = isset($_POST["furigana"]) ? trim($_POST["furigana"]) : "未記入";
$email = isset($_POST["email"]) ? trim($_POST["email"]) : "未記入";
$phone = isset($_POST["phone"]) ? trim($_POST["phone"]) : "未記入";
$service = isset($_POST["service"]) && is_array($_POST["service"]) ? implode(", ", $_POST["service"]) : "未選択";
$budget = isset($_POST["budget"]) ? trim($_POST["budget"]) : "未記入";
$message = isset($_POST["message"]) ? trim($_POST["message"]) : "未記入";

// **件名を UTF-8 のまま送信**
$subject = "【お問い合わせ】{$name} 様より";

// **本文の作成**
$body = <<<EOM
【お問い合わせ内容】

■ お名前: $name
■ ふりがな: $furigana
■ メールアドレス: $email
■ 電話番号: $phone
■ ご希望のサービス: $service
■ ご予算: $budget 万円
■ メッセージ:
$message
EOM;

// **送信元（From）の設定**
$from_name = "ポートフォリオサイト";
$from_email = "no-reply@shoei-portfolio.site";
$from = "{$from_name} <{$from_email}>";

// **メールヘッダー**
$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

// **メール送信**
if (mb_send_mail($to, $subject, $body, $headers)) {
    echo "success"; // Ajaxで確認するための返答
} else {
    echo "error";
}
?>
