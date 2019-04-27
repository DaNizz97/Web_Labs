<?php
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

//Задание необходимых заголовков для ответа
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Content-Type', 'application/javascript')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

//GET запрос на получение новостей, которые еще не были одобрены админом (is_posted = 1)
$app->get('/api/news', function(Request $request, Response $response){
  $sql = "SELECT users.name AS username, news.id, news.title, news.body, news.creation_date, news.is_posted FROM users JOIN news ON users.id = news.user_id where news.is_posted > 0;";

  try {
    $db = new db();
    $db = $db->connect();

    $stmt = $db->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($users);
  } catch (PDOException $e) {
      echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});

//GET запрос на получение всех новостей (для админа)
$app->get('/api/news/all', function(Request $request, Response $response){
  $sql = "SELECT users.name AS username, news.id, news.title, news.body, news.creation_date, news.is_posted FROM users JOIN news ON users.id = news.user_id;";

  try {
    $db = new db();
    $db = $db->connect();

    $stmt = $db->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($users);
  } catch (PDOException $e) {
      echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});

//Запрос на удаление новости по id
$app->delete('/api/news/delete/{id}', function(Request $request, Response $response){
  $route = $request->getAttribute('route');
  $postId = $route->getArgument('id');
  $sql = "DELETE FROM news WHERE id=${postId};";
    try {
      $db = new db();
      $db = $db->connect();

      $stmt = $db->query($sql);
      $db = null;
    } catch (PDOException $e) {
        echo '{"error": {"text": '.$e->getMessage().'}}';
    }
});

//Обновление статуса новости (публикация новости админом)
$app->get('/api/news/publish/{id}', function(Request $request, Response $response){
  $route = $request->getAttribute('route');
  $postId = $route->getArgument('id');
  $sql = "UPDATE news SET is_posted=1 WHERE id=${postId};";
    try {
      $db = new db();
      $db = $db->connect();

      $stmt = $db->query($sql);
      $db = null;
    } catch (PDOException $e) {
        echo '{"error": {"text": '.$e->getMessage().'}}';
    }
});

//Добавление новости (из формы)
$app->post('/api/news/add', function(Request $request, Response $response) {
  try {
    $db = new db();
    $db = $db->connect();

      $title = $request->getParam('title');
      $_title = $db->quote($title);
      echo $_title;
      $body = $request->getParam('body');
      $_body =$db->quote($body);
      $username = $request->getParam('username');
      $_username = $db->quote($username);

      $sql = "INSERT INTO users (name) VALUES (${_username});";
      $sqlPost = "INSERT INTO news (title, body, user_id, is_posted) values (${_title}, ${_body}, LAST_INSERT_ID(), 0);";
    $stmt = $db->query($sql);
    $stmt = $db->query($sqlPost);
    $db = null;
  } catch (PDOException $e) {
      echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});
