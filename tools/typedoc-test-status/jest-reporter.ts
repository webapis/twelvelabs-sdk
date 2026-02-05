import { AggregatedResult, Test, TestResult } from '@jest/test-result';
import * as fs from 'fs';
import * as path from 'path';

// A map where the key is the class name (e.g., "IndexResource")
// and the value is another map of method names to their test status.
interface TestStatusMap {
  [className: string]: {
    [methodName: string]: {
      status: 'pass' | 'fail' | 'skip';
      testName: string;
      duration: number;
    };
  };
}

/**
 * A custom Jest reporter that generates a JSON file with the status of each test.
 * This file is then used by the TypeDoc plugin to inject status badges.
 */
class TestStatusReporter {
  // Jest calls this method after each test file has been executed.
  onTestResult(_test: Test, testResult: TestResult) {
    const testStatusMap = this.loadExistingStatus();

    for (const result of testResult.testResults) {
      // We rely on a convention for test descriptions: "ClassName.methodName should ..."
      const [className, methodName] = this.extractClassAndMethod(result.ancestorTitles);

      if (!className || !methodName) {
        continue;
      }

      if (!testStatusMap[className]) {
        testStatusMap[className] = {};
      }

      testStatusMap[className][methodName] = {
        status: result.status === 'passed' ? 'pass' : result.status === 'failed' ? 'fail' : 'skip',
        testName: result.fullName,
        duration: result.duration || 0,
      };
    }

    this.writeStatus(testStatusMap);
  }

  // Jest calls this method after all tests have been run.
  onRunComplete(_contexts: Set<any>, results: AggregatedResult) {
    // This is a good place for final summary, but onTestResult is better for granular status.
    console.log('Test Status Reporter: Run complete. Status file generated.');
  }

  private extractClassAndMethod(ancestorTitles: string[]): [string | null, string | null] {
    if (ancestorTitles.length === 0) return [null, null];
    // Convention: The first ancestor title is "ClassName.methodName"
    const parts = ancestorTitles[0].split('.');
    if (parts.length === 2) {
      return [parts[0], parts[1]];
    }
    return [null, null];
  }

  private getStatusFilePath(): string {
    return path.join(process.cwd(), '.test-status.json');
  }

  private loadExistingStatus(): TestStatusMap {
    const filePath = this.getStatusFilePath();
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  private writeStatus(testStatusMap: TestStatusMap) {
    const filePath = this.getStatusFilePath();
    fs.writeFileSync(filePath, JSON.stringify(testStatusMap, null, 2));
  }
}

module.exports = TestStatusReporter;
