Feature: Booking 1 movie ticket for Thursday
"Бронируем один билет на фильм"
    Scenario: We book one ticket for the movie
        Given user is on "/index.php" page
        When user select 2-th day and movie
        When the user selects 3 rows and 5 seat
        Then user received confirmation and qr-code

        "Проверяем, занято ли место после оформления заказа"

    Scenario: The user wants to check if the seat is booked
        Given user is on "/index.php" page
        When user select 2-th day and movie
        When the user selects 3 rows and 5 seat
        When user is on "/index.php" page
        When user select 2-th day and movie
        When sees that 3 row and 5 seat is taken trying select them
        Then Book button is not active

"Проверяем, можно ли забронировать билет, если места заняты"
     Scenario: TWe check whether it is possible to book a ticket if the seats are occupied
        Given user is on "/index.php" page
        When user select 2-th day and movie
        When the user selects 3 rows and 5 seat
        Then Book button is not active


           

            



