export const missions = [
    {
        id: 1,
        title: "破壊的メソッドの排除",
        objective: "元のデータを直接書き換えると、予期せぬ副作用を与えます。非破壊的な手法に変更してください。",
        hint: "sort! や map! などの「!」付きではなく、新しい結果を返すメソッドを使いましょう。",
        code: "def process_data(data)\n  data.sort!\n  data.reverse!\nend",
        correctCode: "def process_data(data)\n  data.sort.reverse\nend",
        keywords: ["sort.reverse"],
        removeKeywords: ["sort!", "reverse!"],
        explanation: "特定の操作が元のデータそのものを書き換えてしまうと、そのデータを参照している他の処理で、意図せず値が変わってしまう『副作用』を招きます。現代の開発では、元の状態を維持する『不変性（Immutability）』を保つことで、実行結果の予測を容易にし、テストのしやすい堅牢なロジックを構築するのが鉄則です。"
    },
    {
        id: 2,
        title: "nilへの配慮（ぼっち演算子）",
        objective: "オブジェクトが nil の場合にメソッドを呼ぶとエラーになります。安全にアクセスしてください。",
        hint: "Rubyのぼっち演算子「&.」を利用して、nilガードを実装しましょう。",
        code: "def user_name(user)\n  user.profile.name\nend",
        correctCode: "def user_name(user)\n  user&.profile&.name\nend",
        keywords: ["&."],
        removeKeywords: [],
        explanation: "深い階層にあるデータにアクセスする際、途中の要素が存在しない（未定義）とシステムが即座にクラッシュします。安全なアクセス記法を用いることで、要素が欠けている場合にはエラーを投げずに処理を継続させ、アプリケーションの可用性を高めることができます。これは、不安定な外部データやオプション項目を扱う際の必須テクニックです。"
    },
    {
        id: 3,
        title: "型の不一致の解消",
        objective: "文字列と数値をそのまま演算しようとするとエラーになります。型を明示的に変換してください。",
        hint: ".to_i を使用して文字列を整数に変換しましょう。",
        code: "def add_tax(price_str)\n  price_str + 10\nend",
        correctCode: "def add_tax(price_str)\n  price_str.to_i + 10\nend",
        keywords: ["to_i"],
        removeKeywords: [],
        explanation: "外部からの入力はしばしば意図しない形式（文字列など）で届きます。型を意識せずに計算を行うと、実行時に致命的なエラーを引き起こします。データの境界線において明示的に型を変換（キャスト）することは、データの整合性を保証し、予期せぬ論理崩壊を防ぐための基本的な防衛策です。"
    },
    {
        id: 4,
        title: "慣習的な真偽判定",
        objective: "要素の存在確認を length 比較で行うのは冗長です。より直感的なメソッドを使ってください。",
        hint: ".present? や .any? が使えます。",
        code: "def has_items?(items)\n  items.length > 0\nend",
        correctCode: "def has_items?(items)\n  items.present?\nend",
        keywords: ["present?", "any?"],
        removeKeywords: ["length > 0"],
        explanation: "「長さが0より大きいか」という数値比較は、内部のデータ構造（個数）という実装の詳細を意識させてしまいます。存在を確認するための専用メソッドを使うことで、コードは『何をしているか』という目的を直接伝えるようになります。また、未定義値や空の状態を包括的にチェックできるため、より直感的で正確な論理判定が可能になります。"
    },
    {
        id: 5,
        title: "インスタンス変数の汚染防止",
        objective: "ビューに渡さない一時的な計算値に @ を使うと、オブジェクトの状態が無駄に増えてしまいます。",
        hint: "@ を消してローカル変数に変更してください。",
        code: "def calc(a, b)\n  @result = a + b\n  @result * 2\nend",
        correctCode: "def calc(a, b)\n  result = a + b\n  result * 2\nend",
        keywords: ["result ="],
        removeKeywords: ["@result"],
        explanation: "共有変数はオブジェクトの状態（State）を増やし、管理を複雑にします。一つの処理内で完結する計算にまでこれを使うと、意図しない場所からの書き換えバグを引き起こす原因になります。影響範囲（スコープ）を可能な限り狭めることで、副作用のない、見通しの良いクリーンなコードを維持できます。"
    },
    {
        id: 6,
        title: "変数のシャドウイング回避",
        objective: "外側の変数と同じ名前をブロック内で使うと、データの参照ミスを引き起こします。",
        hint: "ブロック引数を user などの単数形にして、変数名の重複を避けてください。",
        code: "def get_ids(users)\n  users.map { |users| users.id }\nend",
        correctCode: "def get_ids(users)\n  users.map { |user| user.id }\nend",
        keywords: ["|user|"],
        removeKeywords: ["|users|"],
        explanation: "外側のスコープと同じ名前を内側（繰り返し処理の引数など）で再利用すると、外側のデータにアクセスできなくなります。これは読み手に混乱を与えるだけでなく、本来操作したかったデータを取り違える致命的なバグを招きます。常に一意で、対象が単数なのか複数なのかを意識した命名を徹底しましょう。"
    },
    {
        id: 7,
        title: "定数の適切な使用",
        objective: "途中で値が変わるはずのものに大文字（定数）を使わないでください。",
        hint: "定数 MAX_VALUE ではなく、ローカル変数 max_value として定義し直しましょう。",
        code: "def update_limit(val)\n  MAX_VALUE = val\n  puts MAX_VALUE\nend",
        correctCode: "def update_limit(val)\n  max_value = val\n  puts max_value\nend",
        keywords: ["max_value"],
        removeKeywords: ["MAX_VALUE"],
        explanation: "定数はシステム全体で変わらないルールを定義するためのものです。動的に値が変わるものにこれを使うのは設計上の誤りであり、警告やエラーの原因となります。変更されるべき値は通常の変数として扱い、役割を明確に分けることで、コードの意図が正しく伝わります。"
    },
    {
        id: 8,
        title: "N+1問題の解決（事前取得）",
        objective: "ループ内でアソシエーションを呼ぶと、クエリが大量発行されます。一括取得してください。",
        hint: ".includes(:comments) を追加して、一回のクエリで取得しましょう。",
        code: "def list_comments\n  records = Record.all\n  records.each { |r| r.comments.each { |c| puts c.body } }\nend",
        correctCode: "def list_comments\n  records = Record.includes(:comments).all\n  records.each { |r| r.comments.each { |c| puts c.body } }\nend",
        keywords: ["includes(:comments)"],
        removeKeywords: [],
        explanation: "親要素に対して子要素を一つずつ取得しに行く設計は、データ量が増えるにつれて急激にデータベースへの負荷を高め、パフォーマンスを低下させます。関連データをあらかじめ一括で読み込む（事前取得）ことで、通信回数を最小限に抑えることができます。これは大規模システムを運用する上で必須の最適化技術です。"
    },
    {
        id: 9,
        title: "Strong Parametersの導入",
        objective: "params をそのまま update に渡すと、悪意あるデータまで保存されてしまいます。",
        hint: "require と permit を使い、許可する項目を絞ってください。",
        code: "def update_user\n  @user.update(params[:user])\nend",
        correctCode: "def update_user\n  user_params = params.require(:user).permit(:name)\n  @user.update(user_params)\nend",
        keywords: ["require", "permit"],
        removeKeywords: [],
        explanation: "外部からのデータは『信頼できないもの』として扱うべきです。許可していない項目を不正に操作される脆弱性を防ぐため、ホワイトリスト方式で必要な項目のみを抽出します。これはアプリケーションの整合性とセキュリティを担保するための必須設計です。"
    },
    {
        id: 10,
        title: "保存処理の成否判定",
        objective: "save の戻り値を無視すると、エラー時にユーザーが気付けません。",
        hint: "if 文を使って、保存に成功した場合と失敗した場合の処理を分けてください。",
        code: "def create\n  @record = Record.new(record_params)\n  @record.save\n  redirect_to @record\nend",
        correctCode: "def create\n  @record = Record.new(record_params)\n  if @record.save\n    redirect_to @record\n  else\n    render :new\n  end\nend",
        keywords: ["if @record.save"],
        removeKeywords: [],
        explanation: "データの保存処理は、バリデーションや制約によって常に失敗する可能性があります。成否を判定せずに処理を進めるのは不誠実な設計です。失敗時には元の入力を保持したまま再試行を促すなど、丁寧な条件分岐を実装することがユーザー体験（UX）の向上に直結します。"
    },
    {
        id: 11,
        title: "慣習的な空判定",
        objective: "空文字との直接比較ではなく、慣習的な直感的メソッドを使ってください。",
        hint: "name != \"\" よりも簡潔な .present? メソッドを使いましょう。",
        code: "def valid?(name)\n  name != \"\"\nend",
        correctCode: "def valid?(name)\n  name.present?\nend",
        keywords: ["present?"],
        removeKeywords: ["!=", "\"\""],
        explanation: "空文字との直接比較は、未定義値を見落とす危険があります。多目的な存在判定メソッドを用いることで、複数の『空の状態』を包括的にチェックでき、バグの入り込む余地を減らせます。コードがより簡潔になり、開発者の意図が明確に伝わるようになります。"
    },
    {
        id: 12,
        title: "条件の網羅（else句）",
        objective: "想定外のデータが来た際に何も起きないのを防ぐため、例外を投げてください。",
        hint: "else 句を追加し、そこで raise エラーを発生させましょう。",
        code: "def color(status)\n  case status\n  when :ok then \"green\"\n  when :ng then \"red\"\n  end\nend",
        correctCode: "def color(status)\n  case status\n  when :ok then \"green\"\n  when :ng then \"red\"\n  else raise \"Unknown status\"\n  end\nend",
        keywords: ["else", "raise"],
        removeKeywords: [],
        explanation: "想定外のデータを黙って受け流すと、後の工程で原因不明のエラーが発生し、特定が困難になります。異常を検知した瞬間に即座にエラーを発生させる（Fail Fast）ことで、デバッグの効率を高め、システムの健全性を保つことができます。"
    },
    {
        id: 13,
        title: "重複 (DRY)",
        objective: "同じ処理のコピペを排除し、一つのメソッドにまとめてください。",
        hint: "名前の結合処理を full_name メソッドとして抽出しましょう。",
        code: "def label(u)\n  \"Name: #{u.first} #{u.last}\"\nend\ndef icon(u)\n  \"Icon for #{u.first} #{u.last}\"\nend",
        correctCode: "def full_name(u)\n  \"#{u.first} #{u.last}\"\nend\ndef label(u)\n  \"Name: #{full_name(u)}\"\nend\ndef icon(u)\n  \"Icon for #{full_name(u)}\"\nend",
        keywords: ["full_name(u)"],
        removeKeywords: [],
        explanation: "同じ知識を複数箇所に書くと、仕様変更のたびにすべての箇所を修正する手間とリスクが発生します。定義を一箇所に絞る（DRY原則）ことで、保守性を劇的に高め、変更に強いしなやかなコードを構築できます。"
    },
    {
        id: 14,
        title: "マジックナンバー",
        objective: "「3」が何を指すか不明確です。Enum（列挙型）のような名前付き定数で比較してください。",
        hint: "status == 3 ではなく、status.archived? のような形式を検討しましょう。",
        code: "def archived?(entry)\n  entry.status == 3\nend",
        correctCode: "def archived?(entry)\n  entry.archived?\nend",
        keywords: ["archived?"],
        removeKeywords: ["== 3"],
        explanation: "コード内に唐突に現れる具体的な数値は『マジックナンバー』と呼ばれ、その意図が不明確です。これに名前を付けて抽象化することで、コードを人間が読める文章のように変えることができ、ドキュメントがなくてもロジックが理解できる自己説明的な設計になります。"
    },
    {
        id: 15,
        title: "大量データ",
        objective: "全件一括ロードはメモリ不足を招きます。分割して処理してください。",
        hint: ".all.each ではなく .find_each を使用しましょう。",
        code: "def notify_all\n  User.all.each { |u| Mailer.send(u) }\nend",
        correctCode: "def notify_all\n  User.find_each { |u| Mailer.send(u) }\nend",
        keywords: ["find_each"],
        removeKeywords: ["all.each"],
        explanation: "膨大なデータを一括でメモリに載せようとすると、リソースの枯渇を招きシステムが停止します。一定件数ずつ段階的に処理することで、メモリ消費を一定に保ち、大規模なデータセットに対しても安定した動作を保証できます。"
    },
    {
        id: 16,
        title: "例外の握り潰し",
        objective: "rescue の中を空にするのは危険です。必ずログを残してください。",
        hint: "Logger.error を使って、エラー内容を記録しましょう。",
        code: "def call_api\n  api_call\nrescue => e\n  # ignore\nend",
        correctCode: "def call_api\n  api_call\nrescue => e\n  Logger.error(e.message)\nend",
        keywords: ["Logger.error"],
        removeKeywords: ["# ignore"],
        explanation: "エラーを捕捉した際に何もしないことは、見えないバグを蓄積させる行為です。最低限、発生したエラーを記録に残すことで、後からの追跡と修正を可能にします。これはシステムの透明性と信頼性を維持するためのプロフェッショナルの責任です。"
    },
    {
        id: 17,
        title: "通信のタイムアウト",
        objective: "外部通信にタイムアウトがないと、相手が重い時に道連れになります。",
        hint: "http_client に timeout オプションを追加してください。",
        code: "def fetch\n  HTTP.get(\"http://api.com\")\nend",
        correctCode: "def fetch\n  HTTP.timeout(5).get(\"http://api.com\")\nend",
        keywords: ["timeout"],
        removeKeywords: [],
        explanation: "外部環境は常に不安定であるという前提に立ち、自システムを守るための境界線（タイムアウト）を設けます。相手の応答を待ち続けてリソースを使い果たすことを防ぎ、システム全体の連鎖的なダウンを回避するための重要な守備設計です。"
    },
    {
        id: 18,
        title: "メソッドの長さ",
        objective: "一つのメソッドに処理を詰め込みすぎです。小さな単位に分けてください。",
        hint: "通知処理を notify_user という別のメソッドに切り出しましょう。",
        code: "def save_and_notify(user)\n  user.save\n  puts \"Sending email...\"\n  puts \"Done.\"\nend",
        correctCode: "def notify_user(user)\n  puts \"Sending email...\"\n  puts \"Done.\"\nend\ndef save_and_notify(user)\n  user.save\n  notify_user(user)\nend",
        keywords: ["notify_user(user)"],
        removeKeywords: [],
        explanation: "一つの関数が持つ役割を最小限に絞る（単一責任の原則）ことで、コードの再利用性が高まり、テストが容易になります。小さな部品を組み合わせる構造にすることで、全体の複雑さを抑え、将来の変更に柔軟に対応できる設計になります。"
    },
    {
        id: 19,
        title: "命名の妥当性",
        objective: "data などの曖昧な名前は避けてください。中身がわかる名前にリネームしてください。",
        hint: "data ではなく active_users などの具体的な名前に変更しましょう。",
        code: "def send_invitation(data)\n  data.each { |u| u.invite! }\nend",
        correctCode: "def send_invitation(active_users)\n  active_users.each { |user| user.invite! }\nend",
        keywords: ["active_users"],
        removeKeywords: ["data"],
        explanation: "適切な命名は、コードそのものを説明書へと変えます。変数が『何であり、どんな役割か』を明確にすることで、読み手の認知的負荷を下げ、メンテナンス効率を劇的に向上させます。良い名前を付けることは、最も効率的なドキュメント作成です。"
    },
  {
        id: 20,
        title: "デバッグコードの除去", // 名前を変更
        objective: "本番コードに開発用の検証コードや不要なメモを残さないでください。",
        hint: "出力を確認するための命令やデバッグ用のコードをすべて削除してください。",
        code: "def final_logic(val)\n  p val # check\n  debugger\n  val * 1.1\nend",
        correctCode: "def final_logic(val)\n  val * 1.1\nend",
        keywords: [],
        removeKeywords: ["debugger", "p val", "# check"],
        explanation: "開発中に使用した検証用の命令や不要なコメントは、ログの汚染や情報流出のリスクを招きます。最終成果物を美しく整え、必要なロジックのみに絞り込むことは、品質管理における最後の大切な仕上げの工程です。"
    }
];