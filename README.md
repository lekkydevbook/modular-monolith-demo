# modular-monolith-demo
Using functional closures, factory functions and dependency injection to build a modular monolith app.

# service.ts

1. The Factory Function acts as the "Constructor"
    The 'db' and 'notificationModule' parameters are now trapped in a closure!
    Every function defined below has permanent, exclusive access to them.

2. Downward Injection via Closure
    This inner function freely uses the dependencies provided above

3. Return the public interface


# Step-by-Step: Injecting Downward
In our Express architecture, dependencies flow down through layers 
like an assembly line during startup (bootstrap). 
Notice how the inner layers never need to know where the top-level tools (like the database client) came from:
1. Top Level (app.ts): You create the global db client pool.
2. Module Level (index.ts): You pass that db client into the Service Factory.
3. Controller Level: The Service Factory returns an object containing the business functions. 
  You pass that resulting Service object into the Controller Factory.
4. Router Level: The Controller Factory returns HTTP handler functions. 
  You pass those into the Router Factory.
  
Because of closures, when a web request finally hits your router, 
the router calls the controller, which calls the service, 
and the service still remembers the exact database instance 
you gave it at the very beginning.

# index.ts data flow
Router > Controller > Service 

Router gets Controller via dependency injection
Controller gets Service via dependency injection
Service gets (db-client and notification-module) via dependency injection


# src/app.ts
This file initializes all modules, 
manages their dependencies cleanly, 
and executes the system.


## execute code across modules synchronously
In a modular monolith, a direct in-memory call 
via an injected module interface is the cleanest 
way to execute code across modules synchronously.
Because both modules live inside the exact same Node.js operating system process, 
this call bypasses the network completely. 
It is simply one JavaScript function invoking another JavaScript function.

// never imported anywhere (order/index.ts)
export type OrderModule = ReturnType<typeof createOrderModule>;


## Notification logs
[Order Module] Creating order K7X8R2W for buyer@example.com
[Notification Module] Email sent to admin@store.com | Subject: New Order Alert: K7X8R2W
[Notification Module] Async event received: order.created (K7X8R2W)
[Notification Module] Email sent to buyer@example.com | Subject: Order #K7X8R2W Confirmed

# strict architectural rule to Maintain Decoupling
To prevent this from turning into a messy, tightly coupled "spaghetti" monolith, 
you must follow one strict architectural rule: 
<Depend on the interface type, never the implementation details.>


# dependency injection (DI)
In software engineering, dependency injection (DI) simply means 
passing a function or object its required tools rather than having it create them itself.
