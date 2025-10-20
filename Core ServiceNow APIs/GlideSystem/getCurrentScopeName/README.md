**getCurrentScopeName()** is a GlideSystem method to get the name of the current application scope. Following code can be used to get the name.

gs.info(gs.getCurrentScopeName());//prints rhino.global if ran in Global scope

Scope can be changed from the Application Scope Picker.

<img width="421" height="128" alt="Screenshot 2025-10-20 at 9 34 00 AM" src="https://github.com/user-attachments/assets/03b198a9-c689-4865-b68c-a397e1ea44ea" />

If ran in a private application scope the output will contain the name of the private application.

<img width="1308" height="130" alt="Screenshot 2025-10-20 at 9 35 12 AM" src="https://github.com/user-attachments/assets/761a0b03-3ebc-40fc-b518-d3dce0c691a8" />


