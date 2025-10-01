# Detect Circular Reference in Task Dependencies

## Overview

This Script Include helps identify **circular dependencies** in task relationships within ServiceNow. Circular references can cause workflow issues, reporting errors, and logic failures in project management or task tracking modules.

## What It Does

- Traverses task dependencies recursively.
- Detects if a task is indirectly dependent on itself.
- Returns `true` if a circular reference is found, `false` otherwise.

## Use Case

Imagine Task A depends on Task B, and Task B depends on Task A. This creates a circular loop that can break automation or cause infinite recursion. This script helps prevent such configurations.


