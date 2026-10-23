# Development Agreement
This document is a pack of rules to help the mod stay in a constistent, understandable style.

1. Don't use typeof if you know that the data is passed correctly.

2. Don't use `any`. Use `generics` and `unknown` if you don't know the type. The best case is to create an `interface` for your argument if needed.

3. Don't use `try-catch` everywhere — paranoia is your enemy. If you can identify situations where an error or exception can really be thrown, review and fix your code, or contact me.

4. Don't use `===` everywhere, use `==` instead at default cases (rhino moment).

5. Don't use `undefined`, only `null`.

6. Don't make objects as modules, make `namespaces`.

7. Write variables, object keys and methods in `camelCase`, classes and modules in `PascalCase`.

8. If you have a class that handles events, use `@SubscribeEvent`.

9. If you have many network packets, use `@NetworkClientPacket` and `@NetworkServerPacket`.

10. Store blocks in the `BlockList` class and items in the `ItemList` class.

11. For key checks in objects, use the `in` operator.

12. Don't commit code you don't understand.

13. Don't add new libraries - all the necessary ones are already included.