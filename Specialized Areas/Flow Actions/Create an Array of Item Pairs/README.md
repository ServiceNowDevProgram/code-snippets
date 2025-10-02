# Random Pair Generator

## Overview
This script generates random pairs from an input array.  
It is useful for creating **tournament matches**, **group assignments**, or **randomized pairings**.  

The script is structured to run in a scoped execution context (such as **ServiceNow Flow Designer Actions** or **Scripted REST Transforms**) where it accepts `inputs` and `outputs` objects.

---

## How It Works
1. **Shuffle the Input Array**  
   - Implements the Fisher–Yates algorithm in `shuffleArray()` to randomize the array.

2. **Create Random Pairs**  
   - Iterates through the shuffled array in steps of two.  
   - Forms pairs `[item1, item2]`.  
   - If the array has an odd length, the last item is placed in a single-element array `[item]`.

3. **Return Results**  
   - The final set of pairs is returned as `outputs.match`.
