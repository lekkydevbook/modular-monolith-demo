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
