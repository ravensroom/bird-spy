import { Job } from '../../../../src/main.js';

interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const { title, company, location, href, description } = job;
  return (
    <div className="flex flex-col border-t-8 border-blue-800 shadow px-3 py-1">
      <div className="font-bold text-gray-800 text-xl my-1">
        <a
          href={href}
          target="_blank"
          className="hover:bg-indigo-300 active:bg-blue-400 p-2"
        >
          {title}
        </a>
      </div>

      <div className="text-sm mb-2 text-gray-800">
        <span className="mx-8">Company: {company}</span>
        <span>Location: {location}</span>
      </div>

      <div className="mx-2 px-5 py-2 shadow-md shadow-blue-800 text-lg bg-indigo-200 mx-4 mb-2 sm:mx-6 text-slate-900">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        porro nobis perferendis aspernatur, ipsa vitae rerum illo. In voluptate
        perspiciatis officia suscipit dignissimos nulla, maxime facilis sit,
        aliquid blanditiis expedita animi sunt laudantium inventore iusto quasi
        repellat ullam optio assumenda dolorum ea! Perferendis quia repudiandae
        est sint vitae culpa obcaecati! Quaerat doloribus temporibus quas
        laborum. Sit, illo consequatur architecto quam iusto incidunt similique.
        Eum et delectus ratione minima corrupti deserunt quibusdam qui magnam
        voluptatibus officiis incidunt, culpa animi saepe exercitationem
        consequatur enim a expedita repellendus eius esse totam veritatis. Quae,
        laudantium obcaecati. Hic saepe, ipsum suscipit consequatur repellendus
        omnis doloremque aliquam exercitationem animi vero voluptatibus
        obcaecati veniam rem cupiditate magnam modi inventore delectus!
        Voluptatum officiis itaque laboriosam repudiandae quas amet veritatis
        numquam quia voluptas quos. Dolor cum, porro temporibus inventore iusto
        aspernatur ab consectetur tempore sequi laudantium incidunt
        exercitationem sunt quis quae voluptas fugiat nisi pariatur. Minus
        cupiditate ipsa deleniti tenetur sequi id doloremque ratione fuga,
        excepturi molestias recusandae culpa labore possimus nihil maxime
        quisquam similique eius qui quam consequatur laudantium iusto ducimus
        quos quod. Vero sint atque laboriosam animi voluptatem, aliquam
        eligendi. Ipsum cum dolorem, corporis aliquam deserunt veritatis nam
        tenetur fugiat soluta. Odio dolorem quidem quas autem. Quidem quis,
        reiciendis ducimus et neque excepturi iste fugit quos! Perferendis,
        dolorem eligendi consequatur ad recusandae ducimus harum. Voluptas
        excepturi tempore sunt iste voluptatibus optio ea inventore vel
        voluptate!
      </div>
    </div>
  );
};

export default JobItem;
