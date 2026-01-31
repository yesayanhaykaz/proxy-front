<?php
// Place this file as: proxy/public/api/plans.php
// Purpose: provide plans JSON for Next.js frontend (same-domain, session-friendly)

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

// Optional: allow only GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

require_once __DIR__ . '/../includes/db.php';

try {
  $plans = [];
  $stmt = $pdo->query("SELECT * FROM proxies WHERE status = 'active' ORDER BY type, price ASC");
  while ($row = $stmt->fetch()) {
    $plans[] = $row;
  }

  $descriptions = [];
  $desc_stmt = $pdo->query("SELECT type, description FROM proxy_types");
  while ($row = $desc_stmt->fetch()) {
    $descriptions[strtolower($row['type'])] = $row['description'];
  }

  echo json_encode([
    'plans' => $plans,
    'descriptions' => $descriptions
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error']);
}
