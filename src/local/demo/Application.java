package local.demo;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

  static final Logger logger = LogManager.getLogger(Application.class.getName());

  public static void main(String[] args) {
      logger.info("starting");
      SpringApplication.run(Application.class, args);
  }
}
