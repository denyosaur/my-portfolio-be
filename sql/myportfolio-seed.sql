INSERT INTO users (username, password, is_admin)
VALUES ('Daniel',
        '$2a$04$ispkCksrGkcAh2B7SjB91.AM70Wziyv3/HtpcEArdIA49tzME1rYm',
        TRUE),
        ('admintest',
        '$2a$04$W3uu0D1HG6dCm/z0N.wenOCINBMkwc33A3xVmY/eibxzXaahYZigm',
        TRUE),
        ('notadmin',
        '$2a$04$HqE5es0OcebQjpDCR9hDueIMcX28uJ5fHXaCJw0OfSLzYnw.62Qsi',
        FALSE);

INSERT INTO projects (project_name, project_url, github_url1, github_url2, project_image_url, project_descriptions)
VALUES (
    'Pokecollector',
    'https://pokecollector.herokuapp.com/',
    'https://github.com/denyosaur/pokecolletor_frontend',
    'https://github.com/denyosaur/pokecollector_backend',
    'https://imgur.com/vQRqJGg',
    'Pokecollector is to practice and present my skills for both front-end and back-end. eCommerce sites are very common around the web, so I wanted to make an attempt at building one out from scratch. Although the site does not accept or use any form of real currency (the user can add as much money as they want), the site attempts to mimic the exact userflow from real ecommerce sites.'
    ),
    (
    'Rocketnews',
    'https://rocketnews.herokuapp.com/login',
    'https://github.com/denyosaur/RocketNews',
    'n/a',
    'https://imgur.com/BW2FTV2',
    'Rocketnews was a practice in the implementation a full-stack web application that utilized both external and internal APIs. The front-end was designed with mobile first in mind, to create the most user friendly experience on mobile devices. Larger screen sizes were then developed in addition to the mobile first design. The back-end was created using RESTful routing conventions. Both internal and external API routing is handled by the back end.'
    );

INSERT INTO contact (linkedin_url, github_profile_url, gmail, facebook_url, instagram_url)
VALUES (
    'https://www.linkedin.com/in/danielkim1989/',
    'https://github.com/denyosaur',
    'danielkim1989@gmail.com',
    'https://www.facebook.com',
    'https://www.instagram.com/donniekim/'
    );
