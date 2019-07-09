package sample.webapp.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author yuangui
 * @date 6 Jul 2019 12:36:07
 */

public class ViewServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String page = "/index.jsp";
    RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(page);
    dispatcher.forward(request, response);
  }

}
