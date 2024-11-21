Feature: Booking 1 movie ticket 
"Бронируем один билет на фильм"
    Scenario: We book one ticket for the movie
        Given user is on "/index.php" page
        When user select 2-th day and movie
        When the user selects 2 rows and 5 seat
        Then user received confirmation and qr-code

      "Бронируем один билет на фильм"
    Scenario: We book one ticket for the movie
        Given user is on "/index.php" page
        When user select 4-th day and movie
        When the user selects 1 rows and 5 seat
        Then user received confirmation and qr-code



"Проверяем, можно ли забронировать билет, если места заняты"
     Scenario: TWe check whether it is possible to book a ticket if the seats are occupied
        Given user is on "/index.php" page
        When user select 2-th day and movie
        When the user selects 2 rows and 5 seat
        When user is on "/index.php" page
        When user select 2-th day and movie
        When sees that 2 row and 5 seat is taken trying select them
        Then Book button is not active


       

            



