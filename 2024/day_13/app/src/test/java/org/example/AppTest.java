/*
 * This source file was generated by the Gradle 'init' task
 */
package org.example;

import org.checkerframework.checker.units.qual.Length;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.List;
import java.util.HashMap;

public class AppTest {
  // String path =
  // "/Users/sergei.timokhin/Private/advent-of-code/2024/day_13/example.txt";
  String path = "/Users/sergei.timokhin/Private/advent-of-code/2024/day_13/real.txt";
  App classUnderTest = new App();
  List<String> data = classUnderTest.readLines(path);
  HashMap<Integer, HashMap<String, List<Integer>>> Result = classUnderTest.buildMap(data);

  @Test
  public void reaLines() {
    App classUnderTest = new App();
    assert (classUnderTest.readLines("/home/timon/projects/advent-of-code/2024/day_13/example.txt").size() > 0);
  }

  @Test
  public void parseDataFromFile() {
    App classUnderTest = new App();
    List<String> data = classUnderTest.readLines("/home/timon/projects/advent-of-code/2024/day_13/example.txt");
    var Result = classUnderTest.buildMap(data);
    assert Result.get(0) != null;
  }

  @Test
  public void tryToCalculate() {
    var times = classUnderTest.pressTimes(Result.get(0));
    assert times.get(0) == 80;
    assert times.get(1) == 40;
  }

  @Test
  public void notValidIsCantcalcultated() {
    List<Integer> times = classUnderTest.pressTimes(Result.get(1));
    assert times.size() == 0;
  }

  @Test
  public void numberOfTokensShouldBecorrectForExample() {
    var A = 0;
    var B = 0;
    for (var claws : Result.values()) {
      var t = classUnderTest.pressTimes(claws);
      if (t.size() > 0 && (t.get(0) < 100 && t.get(1) < 0)) {
        A += t.get(0);
        B += t.get(1);
      }
    }
    assert A == 118;
    assert B == 126;

  }

  @Test
  public void sumOfTokens() {
    var sum = classUnderTest.calculateTokensSumm(Result);
    System.out.println(sum);
    assert sum == 29388;

  }
}
