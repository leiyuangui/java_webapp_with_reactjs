<html>
  <head>
    <title>Java Web Application Sample</title>
    <script type="text/javascript">
      var CONTEXT_PATH = '<%= request.getContextPath() %>';
    </script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

      <link rel="stylesheet" href="<%=request.getContextPath()%>/static/css/login.css"></head>

      <body>
        <div id="app"></div>
        <script type="text/javascript" src="<%=request.getContextPath()%>/assets/app-bundle.js"></script>
      </body>
    </html>