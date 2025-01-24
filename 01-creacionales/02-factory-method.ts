/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */
interface Burger {
  ingredients: string;
  price: number;
  prepare(): void;
}

class CheeseBurger implements Burger {
  ingredients = "Cheese, bread";
  price = 10;

  constructor(toppings: string[]) {
    this.ingredients += `, ${toppings.join(", ")}`;
  }

  prepare(): void {
    console.log("Preparing Cheese Burger with ", this.ingredients);
  }
}

class ChickenBurger implements Burger {
  ingredients: string = "Chicken, bread";
  price: 15;
  constructor(toppings: string[]) {
    this.ingredients += `, ${toppings.join(", ")}`;
  }
  prepare(): void {
    console.log("Preparing Chicken Burger with ", this.ingredients);
  }
}

class BeefBurger implements Burger {
  ingredients: "Beef, bread";
  price: number = 25;
  constructor(toppings: string[]) {
    this.ingredients += `, ${toppings.join(", ")}`;
  }
  prepare(): void {
    console.log("Preparing Beef Burger with ", this.ingredients);
  }
}

abstract class Restaurant {
  abstract toppings: string[];
  abstract createBurger(selectedToppings: string[]): Burger;

  orderBurger(selectedToppings: string[]): void {
    const burguer = this.createBurger(selectedToppings);
    burguer.prepare();
  }
}

class CheeseRestaurant extends Restaurant {
  override toppings: string[] = ["tomato", "tartara sauce"];
  override createBurger(selectedToppings: string[]): Burger {
    return new CheeseBurger(selectedToppings);
  }
}

class ChickenRestaurant extends Restaurant {
  override toppings: string[] = ["tomato", "coco sauce"];
  override createBurger(selectedToppings: string[]): Burger {
    return new ChickenBurger(selectedToppings);
  }
}

class BeefRestaurant extends Restaurant {
  override toppings: string[] = ["tomato", "bbq sauce"];
  override createBurger(selectedToppings: string[]): Burger {
    return new BeefBurger(selectedToppings);
  }
}

function main() {
  let restaurant: Restaurant;

  const burgerType = prompt("What burger do you want? (cheese/chicken/beef)");

  switch (burgerType) {
    case "cheese":
      restaurant = new CheeseRestaurant();
      break;
    case "chicken":
      restaurant = new ChickenRestaurant();
      break;
    case "beef":
      restaurant = new BeefRestaurant();
      break;
    default:
      console.log("Invalid burger type");
      return;
  }
  const selectedToppings = prompt(
    `What toppings do you want to add?, we offer: ${restaurant.toppings.join(
      ", "
    )}`
  );
  const toppings = selectedToppings?.split(",") ?? [];
  restaurant.orderBurger(toppings);
}

main();
