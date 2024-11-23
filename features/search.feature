Feature: Booking 1 movie ticket 
"Бронируем один билет на фильм на завтра"
    Scenario: We book one ticket for the movie
        Given user is on "/index.php" page
        When user select 2-th day and movie
        When the user selects 1 rows and 10  seat
        Then user received confirmation
          'После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.'

      "Бронируем один билет на фильм через 4 дня"
    Scenario: We book one ticket for the movie
        Given user is on "/index.php" page
        When user select 4-th day and movie
        When the user selects 1 rows and 10 seat
        Then user received confirmation 
        'После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.'



"Проверяем, можно ли забронировать билет, если места заняты"
     Scenario: TWe check whether it is possible to book a ticket if the seats are occupied
        Given user is on "/index.php" page
        When user select 2-th day and movie
        When sees that 1 row and 9 seat is taken trying select them
        Then Book button is not active


       

            



