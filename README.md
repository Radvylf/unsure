# unsure

Unsure is a stack based esolang, based off of brain-flak, and is made up entirely of words people tend to say while thinking of an answer.

## Basics

Unsure has two stacks, one of which is the active stack.

It is made up of words, separated by spaces. Invalid words will trigger a warning containing only the invalid word. It is impossible for an unsure program to error. All non-alphabetic characters are converted to spaces, and all leading or trailing (or duplicate) spaces are removed. Unsure is case insensitive.

## Words

Uses regular expressions, so `um+` means `um` with any number of additional `m`s.

- **`um+`:** Push the number of `m`s to the active stack (`um` = 1, `ummm` = 3, etc.)
- **`er+`:** Pop an item from the active stack once per `r`, and push their sum
- **`heh`:** Pop the active stack, and push the result (if any) to the non-active stack
- **`oops`:** Discard the top of the active stack
- **`uh+`:** Duplicate the top of the active stack once per `h`
- **`well`:** Push the current height of the active stack
- **`yeah`:** Negate the number on top of the stack
- **`hm+`:** Take input once per `m`, and push to the stack in reverse (so first input on top), -1 if no more input
- **`okay`:** Pop the stack and output the result
- **`then`:** Swap the active stack
- **`but`:** If the top of the active stack is 0 (or empty), will skip ahead to the next `no` (skipping any which are preceded by another `but`), or terminate if there is no valid `no`
- **`wait`:** If the active stack is not empty and the top is not 0, jumps to the last `but`
- **`no`:** Does nothing on its own

## Example programs

Add two inputs:

```
ehh err okay
```

Infinite loop:

```
um but wait
```

Add all inputs:

```
but no hm um err wait oops but um yeah err heh wait then well but oops heh then err then well wait then okay
```

## Using the interpreter

The interpreter is a JS function, which takes code as a string as the first argument, and input as the second. If the third argument is set to true, the input should be a string. Otherwise, it should be an array of numbers.
