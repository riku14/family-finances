# 収支履歴取得API

## 概要
指定した月の収支データを全件取得する。返却データは日付の降順（新しい順）で固定する。  
ソートや絞り込み（カテゴリフィルタなど）はクライアント側で処理する想定のため、本APIでは月単位の指定のみ受け付ける。  
集計（収入合計・支出合計・カテゴリ別合計など）も本APIの返却値を元にクライアント側で算出する。

---

## エンドポイント

```http
GET /api/v1/workspaces/{workspaceId}/transactions
```

---

## リクエスト

### ヘッダー

| 項目 | 値 |
|---|---|
| Authorization | Bearer {token} |

---

### パスパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| workspaceId | Integer | ○ | 対象ワークスペースのID |

---

### クエリパラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| yearMonth | String | ○ | 対象年月（YYYY-MM形式） |

---

### リクエスト例

```http
GET /api/v1/workspaces/10/transactions?yearMonth=2026-05
```

---

## レスポンス

### 成功時

#### 200 OK

取得に成功した場合に返却する。該当データが0件の場合はtransactionsを空配列で返す。  
レスポンスは日付の降順（新しい順）でソート済み。

---

### レスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| yearMonth | String | 対象年月 |
| transactions | Array | 収支データの配列（日付降順） |
| transactions[].id | Integer | 収支ID |
| transactions[].categoryId | Integer | カテゴリID |
| transactions[].categoryName | String | カテゴリ名 |
| transactions[].categoryColor | String | カテゴリ表示色 |
| transactions[].type | String | 種別（income / expense） |
| transactions[].amount | Integer | 金額 |
| transactions[].date | String | 取引日 |
| transactions[].memo | String | メモ |
| transactions[].registeredBy | String | 登録者名 |
| transactions[].createdAt | String | 作成日時 |

---

### レスポンス例

```json
{
  "yearMonth": "2026-05",
  "transactions": [
    {
      "id": 105,
      "categoryId": 10,
      "categoryName": "給与",
      "categoryColor": "#2ECC71",
      "type": "income",
      "amount": 315000,
      "date": "2026-05-25",
      "memo": "5月給与",
      "registeredBy": "太郎",
      "createdAt": "2026-05-25T09:00:00"
    },
    {
      "id": 104,
      "categoryId": 8,
      "categoryName": "医療・健康",
      "categoryColor": "#E74C3C",
      "type": "expense",
      "amount": 2200,
      "date": "2026-05-10",
      "memo": "薬局",
      "registeredBy": "太郎",
      "createdAt": "2026-05-10T18:30:00"
    },
    {
      "id": 103,
      "categoryId": 6,
      "categoryName": "通信費",
      "categoryColor": "#16A085",
      "type": "expense",
      "amount": 3600,
      "date": "2026-05-08",
      "memo": "スマホ料金",
      "registeredBy": "太郎",
      "createdAt": "2026-05-08T20:00:00"
    },
    {
      "id": 102,
      "categoryId": 1,
      "categoryName": "食費",
      "categoryColor": "#FF5733",
      "type": "expense",
      "amount": 3800,
      "date": "2026-05-05",
      "memo": "スーパー食材",
      "registeredBy": "太郎",
      "createdAt": "2026-05-05T19:15:00"
    },
    {
      "id": 101,
      "categoryId": 1,
      "categoryName": "食費",
      "categoryColor": "#FF5733",
      "type": "expense",
      "amount": 1200,
      "date": "2026-05-02",
      "memo": "ランチ",
      "registeredBy": "太郎",
      "createdAt": "2026-05-02T12:30:00"
    },
    {
      "id": 100,
      "categoryId": 2,
      "categoryName": "交通費",
      "categoryColor": "#3498DB",
      "type": "expense",
      "amount": 2500,
      "date": "2026-05-02",
      "memo": "交通費チャージ",
      "registeredBy": "太郎",
      "createdAt": "2026-05-02T08:00:00"
    }
  ]
}
```

---

## エラー

### 400 Bad Request

yearMonthが未指定、または形式が不正な場合に返却する。

---

### エラーレスポンスパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| errorCode | String | エラーコード |
| message | String | エラーメッセージ |

---

### エラーレスポンス例

```json
{
  "errorCode": "INVALID_PARAMETER",
  "message": "yearMonthはYYYY-MM形式で指定してください。"
}
```

---

### 401 Unauthorized

認証エラー時に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "UNAUTHORIZED",
  "message": "認証に失敗しました。"
}
```

---

### 404 Not Found

指定したワークスペースが存在しない場合に返却する。

---

### エラーレスポンス例

```json
{
  "errorCode": "NOT_FOUND",
  "message": "指定されたワークスペースが見つかりません。"
}
```
