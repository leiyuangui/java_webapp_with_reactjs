package sample.webapp.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

/**
 * @author yuangui
 * @date 7 Jul 2019 22:38:44
 */

public class AuthServiceServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    String path = request.getPathInfo();
    System.out.print("request path: " + path);

    switch (path) {
    case "/auth":
      this.authenticate(request, response);
      return;
    case "/validateSession":
      this.validateSession(request, response);
      return;
    case "/logout":
      this.logout(request, response);
      return;
    default:
      throw new ServletException("Request not supported!");
    }

  }

  private void authenticate(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String username = request.getParameter("username");
    String password = request.getParameter("password");

    if (username != null && password != null) {
      JSONObject user = new JSONObject();
      user.put("username", username);
      user.put("login_time", new Date());

      HttpSession session = request.getSession(true);
      session.setAttribute("user", user);

      JSONObject result = new JSONObject();
      result.put("user", user);
      this.writeToResponse(response, result);
    } else {
      response.sendError(401, "Invalid username or password!");
    }
  }

  private void validateSession(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String username = request.getParameter("username");
    HttpSession session = request.getSession(false);

    boolean valid = false;
    if (session != null) {
      JSONObject user = (JSONObject) session.getAttribute("user");
      if (user != null) {
        String sessionUsername = user.getString("username");
        if (sessionUsername != null && sessionUsername.equals(username)) {
          valid = true;
        }
      }
    }

    JSONObject result = new JSONObject();
    result.put("valid", valid);
    this.writeToResponse(response, result);
  }

  private void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
    HttpSession session = request.getSession(false);
    if (session != null) {
      session.invalidate();
    }

    JSONObject result = new JSONObject();
    result.put("success", true);
    this.writeToResponse(response, result);
  }

  private void writeToResponse(HttpServletResponse response, JSONObject result) throws IOException {
    if (result == null) {
      return;
    }

    response.setStatus(200);
    response.setContentType("application/json");

    try (PrintWriter out = response.getWriter()) {
      out.write(result.toString());
      out.flush();
    }
  }

}
