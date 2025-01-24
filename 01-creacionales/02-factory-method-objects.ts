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

function createCheeseBurger(toppings: string[]): Burger {
  const ingredients = `Cheese, bread, ${toppings.join(", ")}`;
  const price = 10;
  return {
    ingredients,
    price,
    prepare() {
      console.log("Preparing Cheese Burger with ", ingredients);
    },
  };
}

function createChickenBurger(toppings: string[]): Burger {
  const ingredients = `Chicken, bread, ${toppings.join(", ")}`;
  const price = 15;
  return {
    ingredients,
    price,
    prepare() {
      console.log("Preparing Chicken Burger with ", ingredients);
    },
  };
}

function createBeefBurger(toppings: string[]): Burger {
  const ingredients = `Beef, bread, ${toppings.join(", ")}`;
  const price = 25;
  return {
    ingredients,
    price,
    prepare() {
      console.log("Preparing Beef Burger with ", ingredients);
    },
  };
}

interface Restaurant {
  readonly toppings: string[];
  createBurger(selectedToppings: string[]): Burger;
  orderBurger(selectedToppings: string[]): void;
}

function createCheeseRestaurant(): Restaurant {
  const toppings = ["tomato", "tartara sauce"];
  return {
    toppings,
    createBurger(selectedToppings: string[]) {
      return createCheeseBurger(selectedToppings);
    },
    orderBurger(selectedToppings: string[]) {
      const burger = this.createBurger(selectedToppings);
      burger.prepare();
    },
  };
}

function createChickenRestaurant(): Restaurant {
  const toppings = ["tomato", "coco sauce"];
  return {
    toppings,
    createBurger(selectedToppings: string[]) {
      return createChickenBurger(selectedToppings);
    },
    orderBurger(selectedToppings: string[]) {
      const burger = this.createBurger(selectedToppings);
      burger.prepare();
    },
  };
}

function createBeefRestaurant(): Restaurant {
  const toppings = ["tomato", "bbq sauce"];
  return {
    toppings,
    createBurger(selectedToppings: string[]) {
      return createBeefBurger(selectedToppings);
    },
    orderBurger(selectedToppings: string[]) {
      const burger = this.createBurger(selectedToppings);
      burger.prepare();
    },
  };
}

function main() {
  let restaurant: Restaurant;

  const burgerType = prompt("What burger do you want? (cheese/chicken/beef)");

  switch (burgerType) {
    case "cheese":
      restaurant = createCheeseRestaurant();
      break;
    case "chicken":
      restaurant = createChickenRestaurant();
      break;
    case "beef":
      restaurant = createBeefRestaurant();
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
