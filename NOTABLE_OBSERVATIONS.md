*Tips for parallel workers:*  
Default Parallel Workers= min(CPU cores / 2, 4)  
```
Examples:  
2 CPU cores  → 1 worker  
4 CPU cores  → 2 workers  
8 CPU cores  → 4 workers  
16 CPU cores → 4 workers (capped at 4)
```
If workers: process.env.CI ? 1 : undefined,=>default calculations will be applied.  
Multiple ways to define workers count: 
```
export default defineConfig({
  workers: 4, // Fixed number of workers
});
export default defineConfig({
  workers: '50%', // Half of available CPU cores
});
```
```
Workers	  Memory Usage	  Recommendation
1-2	      ~500MB-1GB	    Safe for any machine
3-4	      ~1-2GB	        Good for most dev machines
5-8	      ~2-4GB	        High-end machines only
8+	      4GB+	          Diminishing returns, potential instability
```
```
Browser Resource Usage Comparison

Base Memory Usage (Idle Browser Instance)
Browser	Base Memory	Initial CPU	Notes
Chrome/Chromium	150-250 MB	0.1-0.5%	Most memory-hungry
Firefox	100-180 MB	0.1-0.3%	More memory efficient
Safari	80-150 MB	0.1-0.2%	Most efficient (macOS only)

Memory Usage During Test Execution
Browser	Light Test	Medium Test	Heavy Test	Peak Memory
Chrome/Chromium	200-300 MB	400-600 MB	800-1200 MB	Up to 2 GB
Firefox	150-250 MB	300-500 MB	600-900 MB	Up to 1.5 GB
Safari	120-200 MB	250-400 MB	500-700 MB	Up to 1 GB

CPU Usage Patterns
Browser	Navigation	JS Heavy	DOM Operations	Video/Media
Chrome/Chromium	5-15%	20-40%	10-25%	30-60%
Firefox	3-12%	15-35%	8-20%	25-50%
Safari	2-10%	12-30%	6-18%	20-45%

Parallel Workers Impact
Workers	Chrome Total	Firefox Total	Safari Total	Recommended RAM
1	250-500 MB	200-400 MB	150-300 MB	2 GB
2	500-1 GB	400-800 MB	300-600 MB	4 GB
4	1-2 GB	800 MB-1.5 GB	600 MB-1.2 GB	8 GB
6	1.5-3 GB	1.2-2.2 GB	900 MB-1.8 GB	12 GB
8	2-4 GB	1.6-3 GB	1.2-2.4 GB	16 GB

Per-Project Browser Configuration Memory
Configuration	Chrome	Firefox	Safari	Notes
Desktop Chrome	+50 MB	-	-	Full feature set
Mobile Chrome	+30 MB	-	-	Reduced features
Desktop Firefox	-	+40 MB	-	Standard config
Desktop Safari	-	-	+20 MB	Lightweight
Headless Mode	-30%	-25%	-20%	Significant savings
```
```
Small Test Suite (10-50 tests)
workers: process.env.CI ? 1 : undefined, // ~2-4 workers locally
// Memory usage:
// Chrome: 1-2 GB total
// Firefox: 800 MB - 1.5 GB total  
// Safari: 600 MB - 1.2 GB total

Medium Test Suite (50-200 tests)
Scenario	Chrome	Firefox	Safari
2 Workers	800 MB - 1.5 GB	600 MB - 1.2 GB	500 MB - 1 GB
4 Workers	1.5-3 GB	1.2-2.4 GB	1-2 GB
6 Workers	2.5-4.5 GB	2-3.6 GB	1.5-3 GB
```

```
Optimization Tips by Browser
Browser	Memory Optimization	CPU Optimization
Chrome	--disable-dev-shm-usage<br>--disable-extensions	--disable-background-timer-throttling
Firefox	--memory.max<br>--no-remote	--disable-backgrounding-occluded-windows
Safari	Built-in optimization	Native efficiency
```
```
Recommended Configuration Based on System
System RAM	Recommended Workers	Browser Priority	Notes
8 GB	2-3 workers	Safari > Firefox > Chrome	Conservative
16 GB	4-6 workers	Any browser	Balanced
32 GB+	6-8 workers	Chrome for features	Performance
```

