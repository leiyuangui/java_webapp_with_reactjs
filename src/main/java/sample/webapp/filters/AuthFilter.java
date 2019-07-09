package sample.webapp.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author yuangui
 * @date 6 Jul 2019 12:48:10
 */

public class AuthFilter implements Filter {

  public void destroy() {
    // TODO Auto-generated method stub
  }

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest req = (HttpServletRequest) request;
    HttpSession session = req.getSession(false);

    if (session != null && session.getAttribute("user") != null) {
      chain.doFilter(request, response);
    } else {
      String page = "/login";
      RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(page);
      dispatcher.forward(request, response);
    }

  }

  public void init(FilterConfig arg0) throws ServletException {
    // TODO Auto-generated method stub

  }

}
