Feature: Booking 1 movie ticket 

Scenario: We book one ticket for the movie "Бронируем один билет на фильм на завтра"
Given user is on "https://qamid.tmweb.ru/client/index.php" page
When user select 2-th day and movie
When the user selects 2 rows and 10 seat
Then user received confirmation 'После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.'

Scenario: We book one ticket for the movie "Бронируем один билет на фильм через 4 дня"
Given user is on "https://qamid.tmweb.ru/client/index.php" page
When user select 4-th day and movie
When the user selects 2 rows and 10 seat
Then user received confirmation 'После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.'

Scenario: We check whether it is possible to book a ticket if the seats are occupied "Проверяем, можно ли забронировать билет, если места заняты"
Given user is on "https://qamid.tmweb.ru/client/index.php" page
When user select 2-th day and movie
When sees that 1 row and 10 seat is taken trying select them
Then Book button is not active


       

            



