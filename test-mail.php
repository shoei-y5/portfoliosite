<?php
$to = "yoshida.s178@gmail.com"; // ★ここを変更
$subject = "テストメール";
$message = "これはテストメールです。";
$headers = "From: no-reply@shoei-portfolio.site\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "メール送信成功！";
} else {
    echo "メール送信失敗...";
}
?>
